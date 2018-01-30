const Metalsmith =    require('metalsmith')
const collections =   require('metalsmith-collections')
const dateFormatter = require('metalsmith-date-formatter')
const drafts =        require('metalsmith-drafts')
const htmlMinifier =  require('metalsmith-html-minifier')
const layouts =       require('metalsmith-layouts')
const metadata =      require('metalsmith-metadata')
const moveUp =        require('metalsmith-move-up')
const permalinks =    require('metalsmith-permalinks')
const serve =         require('metalsmith-serve')
const mapsite =       require('metalsmith-mapsite')

Metalsmith(__dirname)
  .clean(true)
  .destination('./build')
  .use(drafts())
  .use(collections({
    posts: {
      pattern: 'posts/**',
      sortBy: 'pageDate',
      reverse: true
    }
  }))
  .use(dateFormatter({
    dates: [
      {
        key: 'pageDate',
        format: 'MMMM DD, YYYY'
      }
    ]
  }))
  .use(permalinks({
    pattern: ':title',
    relative: false
  }))
  .use(moveUp('posts/**'))
  .use(mapsite({
    hostname:  'https://blog.eastcoastproduct.com',
    omitIndex: true
  }))
  .use(layouts({
    engine: 'ejs',
    directory: './templates/'
  }))
  .use(htmlMinifier())
  .use(serve({
    port: 4040,
    http_error_files: {
      404: "/error.html"
    }
  }))
  .build(function (err, files) {
    if(err) {
      console.log(err);
      process.exit(1);
    }
    console.log('Build success!');
    if (process.argv[2] && process.argv[2] === '--exit') process.exit(0);
  })
