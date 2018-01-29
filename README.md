# ECP Blog

After cloning/downloading repository on your local machine, navigate to that directory in your terminal and do the

```
npm install
```

While you are positioned in the same directory run `gulp watch` and `nodemon build` in second terminal, this commands will build the site
and run the server and enable live reloading of the project. Now you'll be able to access the homepage by opening
your browser and going to this address
[https://localhost:8080](https://localhost:8080)

Note: After adding new svg files to the project just run `gulp minify-svg` command to generate minified svg files.

## Building and deploying project

Site is hosted on Amazon, to be able to deploy you need to create `.aws.json` configuration file based on provided `.aws.json.example` with your own keys.

If you don't have your own keys head up to the aws
[console](https://console.aws.amazon.com)
and go to `Services -> IAM -> Users` and click on Security Credentials tab.
There you'll see "Create Access Key" button.
After you have clicked on the button box will pop out, click on the "Show User Security Credentials".

Copy "Access Key ID" and paste it to `.aws.json` "key" section and copy "Secret Access Key" and paste it to "secret" section, "bucket" and "region" sections are like in example file.

After that full build and deploy is done by simply running:

```
gulp publish
```

This takes care of building the metalsmith site, minimizing css and deploying changes to S3.
