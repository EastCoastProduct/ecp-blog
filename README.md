# ECP Blog

This repo contains the ECP blog as a separate site from the main marketing site so that it can run on a different subdomain to match the old hosting locations, before we moved it to a static build under our control.

There is no CSS in this repo. When published, this site links to the CSS file from the main marketing site so that we aren't maintaining two duplicates sets of the same code.

If you need to edit the CSS and preview how it's working, you will need to run both projects locally at the same time. They are configured to run local servers on different ports. You can change the link in `src/templates/partials/head.ejs` to reference the marketing sites local server while developing, but don't forget to change it back before deploying updates to this repo.

## Setup

After cloning/downloading the repository on your local machine, navigate to that directory in your terminal and run `npm install` to install all the plugins and packages to run the site locally.

## Working

From the project directory run `nodemon build`, to build the site and run a local server. Now you'll be able to access the homepage by opening your browser and going to this address: [https://localhost:4040](https://localhost:4040)

Go to `src/posts` and duplicate the `template.html` file to make a new post. It has markup examples in it to use for post content. It also has YAML front-matter for configuring information about the post.

To keep a draft unpublished, leave `draft: true` in the front-matter. To publish a draft, change it to `draft: false`. This will allow the post to be built to the `/build` folder.

## Building and Deploying Changes

The site is built using [Metalsmith](http://www.metalsmith.io/). It is a basic static site generator that adds functionality through the use of plugins.

The `build.js` file in the root of this repo configures Metalsmith and its plugins. You can find further documentation on each plugin by Googling the name you see in this file.

The blog is hosted on Amazon S3. To deploy you will need to create an `.aws.json` configuration file to be saved locally. Use the provided `.aws.json.example` but with your own keys to do this.

The repo is set to ignore your local `.aws.json` file. DO NOT change this or you will accidentally publish your keys to the repo.

If you don't have your own keys set up, go to the [AWS console](https://console.aws.amazon.com) and go to `Services -> IAM -> Users` and click on the Security Credentials tab. There you'll see a "Create Access Key" button. After you have clicked on the button a box will pop out, click on the "Show User Security Credentials" button.

Copy "Access Key ID" and paste it into `.aws.json` in the "key" section, then copy "Secret Access Key" and paste it in the "secret" section. The "bucket" and "region" sections should be correct already in the example file.

To build and deploy the site, run `gulp publish`

This builds the site and deploys changes to Amazon S3.

# Invalidating the Cache

We use Cloudfront through AWS to run the site with secure credentials, allowing https access. Cloudfront also caches assets on various servers. When deploying changes to the site you will have to manually invalidate the cache through Cloudfront if you want those changes to be immediately visible.

To do this, go to the [AWS console](https://console.aws.amazon.com) and go to `Services -> Cloudfront` and click on the blog.eastcoastproduct.com distribution. Then go to the "Invalidations" tab. Click the "Create Invalidation" button.

If you only changed a couple of files, you should enter the paths to them in the box that comes up. If you made extensive changes, your best bet is to enter `/*`. This will invalidate the whole site and make all your changes accessible.

A new invalidation will be added to the top of the list when you click "Invalidate". This status will show the invalidation running until it's done and changes to "Completed".

## SVG Files

After adding new svg files to the project, run `gulp minify-svg` to generate minified svg files.
