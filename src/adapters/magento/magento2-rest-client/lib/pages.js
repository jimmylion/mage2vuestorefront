var util = require("util");

module.exports = function(restClient) {
  var module = {};

  module.list = async function(searchCriteria) {
    // Fetching all pages
    var query = "searchCriteria=" + searchCriteria;
    var endpointUrl = util.format("/cmsPage/search?%s", query);
    var response = await restClient.get(endpointUrl);
    var ids = response.items.map(v => v.id);
    var returnable = {
      items: []
    };
    var promises = [];

    for (let id of ids) {
      var secondEndpointUrl = util.format("/jimmylion/cmsPage/%s", id);
      promises.push(restClient.get(secondEndpointUrl));
    }
    returnable.items = await Promise.all(promises);

    return Promise.resolve(returnable);
  };

  return module;
};
