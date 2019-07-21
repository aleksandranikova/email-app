var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: "gfuefrurdeveriugsgli" }, function(err, tunnel) {
  console.log('LT running')
});