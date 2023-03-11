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
} from '@loopback/rest';
import {Therapists} from '../models';
import {TherapistsRepository} from '../repositories';

export class TherapistsController {
  constructor(
    @repository(TherapistsRepository)
    public therapistsRepository : TherapistsRepository,
  ) {}

  @post('/therapists')
  @response(200, {
    description: 'Therapists model instance',
    content: {'application/json': {schema: getModelSchemaRef(Therapists)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Therapists, {
            title: 'NewTherapists',
            
          }),
        },
      },
    })
    therapists: Therapists,
  ): Promise<Therapists> {
    return this.therapistsRepository.create(therapists);
  }

  @get('/therapists/count')
  @response(200, {
    description: 'Therapists model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Therapists) where?: Where<Therapists>,
  ): Promise<Count> {
    return this.therapistsRepository.count(where);
  }

  @get('/therapists')
  @response(200, {
    description: 'Array of Therapists model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Therapists, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Therapists) filter?: Filter<Therapists>,
  ): Promise<Therapists[]> {
    return this.therapistsRepository.find(filter);
  }

  @patch('/therapists')
  @response(200, {
    description: 'Therapists PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Therapists, {partial: true}),
        },
      },
    })
    therapists: Therapists,
    @param.where(Therapists) where?: Where<Therapists>,
  ): Promise<Count> {
    return this.therapistsRepository.updateAll(therapists, where);
  }

  @get('/therapists/{id}')
  @response(200, {
    description: 'Therapists model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Therapists, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Therapists, {exclude: 'where'}) filter?: FilterExcludingWhere<Therapists>
  ): Promise<Therapists> {
    return this.therapistsRepository.findById(id, filter);
  }

  @patch('/therapists/{id}')
  @response(204, {
    description: 'Therapists PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Therapists, {partial: true}),
        },
      },
    })
    therapists: Therapists,
  ): Promise<void> {
    await this.therapistsRepository.updateById(id, therapists);
  }

  @put('/therapists/{id}')
  @response(204, {
    description: 'Therapists PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() therapists: Therapists,
  ): Promise<void> {
    await this.therapistsRepository.replaceById(id, therapists);
  }

  @del('/therapists/{id}')
  @response(204, {
    description: 'Therapists DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.therapistsRepository.deleteById(id);
  }
}
