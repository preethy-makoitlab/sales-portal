import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {Content} from '../models';
import {ContentRepository} from '../repositories';
import { Request, ResponseObject, RestBindings } from '@loopback/rest';
import {inject} from '@loopback/context';
// import { S3 } from 'aws-sdk';
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: 'AKIAYRXY4QOXVNPBEGGM',
  secretAccessKey: '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',
  region: 'ap-south-1',
  apiVersion: 'latest',
});

const myBucket = 'anyo-content';

export class ContentController {
  constructor(
    @repository(ContentRepository)
    public contentRepository : ContentRepository,
    // @inject('aws.s3') private s3Client: S3,
  ) {}

  @post('/contents')
  @response(200, {
    description: 'Content model instance',
    content: {'application/json': {schema: getModelSchemaRef(Content)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Content, {
            title: 'NewContent',
            exclude: ['number'],
          }),
        },
      },
    })
    content: Omit<Content, 'number'>,
  ): Promise<Content> {
    return this.contentRepository.create(content);
  }

  @get('/contents/count')
  @response(200, {
    description: 'Content model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Content) where?: Where<Content>,
  ): Promise<Count> {
    return this.contentRepository.count(where);
  }

  @get('/contents')
  @response(200, {
    description: 'Array of Content model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Content, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Content) filter?: Filter<Content>,
  ): Promise<Content[]> {
    return this.contentRepository.find(filter);
  }

  @get('/contents/getVideoUrl/{videoKey}')
  @response(200, {
    description: 'Streaming Video',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Content, {includeRelations: true}),
      },
    },
  })
  async getVideoUrl(
    @param.query.string('videoKey') videoKey: string,
    @inject(RestBindings.Http.REQUEST) request: Request,
    @inject(RestBindings.Http.RESPONSE) response: ResponseObject,
    ) : Promise<void> {
    const params = {
      Bucket: myBucket,
      Key: videoKey,
      Expires: 600 // 10 minutes
    };

    // const signedUrl = await s3.getSignedUrlPromise('getObject', params);
    const videoStream = s3.getObject(params).createReadStream();

    response.setHeader('Content-Type', 'video/mp4');

    return videoStream.pipe(response);
  } 
  
  @patch('/contents')
  @response(200, {
    description: 'Content PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Content, {partial: true}),
        },
      },
    })
    content: Content,
    @param.where(Content) where?: Where<Content>,
  ): Promise<Count> {
    return this.contentRepository.updateAll(content, where);
  }

  @get('/contents/{id}')
  @response(200, {
    description: 'Content model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Content, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @inject(RestBindings.Http.REQUEST) request: Request,
    @inject(RestBindings.Http.RESPONSE) response: ResponseObject,
  ): Promise<Content> {
    const params = {
      Bucket: myBucket,
      Key: id,
    };

    const videoStream = s3.getObject(params).createReadStream();

    response.setHeader('Content-Type', 'video/mp4');

    return videoStream.pipe(response);
  }

  // @get('/contents/{id}', { //video scrolling api
  //   responses: {
  //     '200': {
  //       description: 'Stream the video file',
  //       content: { 'video/mp4': {} },
  //     },
  //     '404': {
  //       description: 'Not Found',
  //     },
  //   },
  // })
  // async findById(@param.path.string('id') id: string): Promise<any> {
  //   const videoKey = id;
  //   const s3Params = {
  //     Bucket: myBucket,
  //     Key: videoKey,
  //   };

//     const s3HeadObjectResponse = await this.s3Client.headObject(s3Params).promise();
//     const contentLength = s3HeadObjectResponse.ContentLength;
//     const range = {
//       start: 0,
//       end: contentLength! - 1,
//     };

//     if (range.start > range.end) {
//       throw new HttpErrors.BadRequest('Invalid range');
//     }

//     const s3GetObjectResponse = await this.s3Client.getObject({
//       ...s3Params,
//       Range: `bytes=${range.start}-${range.end}`,
//     }).promise();

//     const videoStream = s3GetObjectResponse.Body;

//     return {
//           headers: {
//             'Content-Type': 'video/mp4',
//         'Content-Length': contentLength,
//         'Content-Range': `bytes ${range.start}-${range.end}/${contentLength}`,
//         'Accept-Ranges': 'bytes',
//           },
    
//         body: videoStream,
//     };
//   }
// }

  @patch('/contents/{id}')
  @response(204, {
    description: 'Content PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Content, {partial: true}),
        },
      },
    })
    content: Content,
  ): Promise<void> {
    await this.contentRepository.updateById(id, content);
  }

  @put('/contents/{id}')
  @response(204, {
    description: 'Content PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() content: Content,
  ): Promise<void> {
    await this.contentRepository.replaceById(id, content);
  }

  @del('/contents/{id}')
  @response(204, {
    description: 'Content DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.contentRepository.deleteById(id);
  }
}
