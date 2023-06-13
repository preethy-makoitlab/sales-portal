Sales Portal for Canvera

Node version - 18.14.2
Angular version - 15.2.1
RxJS has been used for reactive programming
CSS - Tailwind with rippleui

steps:

clone the repo
run 'npm install'
run 'ng serve' 
app will run on port 4201 in local (http://localhost:4201/)

for prod or staging build use 'npm run build'

write all calls to parent as a service and subscribe to it

do not hardcode color codes. add them to master constants list (src/styles/constants.scss) and refer to the variable.

use models/constants.ts to declare enums and interfaces

common styles to be defined at src/styles/styles.scss

common functions to be defined at src/utils/utils.ts

going forward when we use state management, refer to state/user path. have added a sample state there

split component into modules and create them under components folder. create common reusable components under components/shared folder

deploy to prod:
1. run 'npm run build'
2. transfer dist folder to /srv/naveen/sales-portal. rename dist folder with date if required
3. sudo cp -R /srv/naveen/sales-portal/your_dist_folder_name /var/www/canvera/sales-portal
4. in nginx config file (/etc/nginx/conf.d/virtual-ssl.conf), add alias of this latest file under /sales-portal path
