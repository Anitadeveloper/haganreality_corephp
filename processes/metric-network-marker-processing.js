
function Main(){
	self.onmessage = function(e){

		var visitors = e.data.visitors;

		var metric_network = e.data.metric_network;

		for(var j = 0; j < visitors.length; j++){
			visitors[j].count = Array();
			visitors[j].marker = Array();
			for(var zoom_level = 0; zoom_level <= 16; zoom_level++){
				visitors[j].count[zoom_level] = 1;
				visitors[j].marker[zoom_level] = null;
			}
		}

		//iterate for each zoom level
		for(zoom_level = 0; zoom_level <= 16; zoom_level++){

			var metre_per_pixel = MetrePerPixel(e.data.map_center,zoom_level);

			var min_distance = 40 * metre_per_pixel * 1.1;

			for(j = 0; j < metric_network.length; j++){
				//find nodes
				var node_index = undefined;
				var to_node_index = undefined;

				for(var k = 0; k < visitors.length; k++){
					if(visitors[k].visitor_id === metric_network[j].visitor_id){
						node_index = k;
					}
					if(visitors[k].visitor_id === metric_network[j].to_visitor_id){
						to_node_index = k;
					}
				}
				//if a distance is too short to create new node
				if(metric_network[j].distance < min_distance && node_index !== undefined && to_node_index !== undefined){
					//if connected node has not merged already
					if(visitors[node_index].count[zoom_level] !== null){ //add to node count to 'node count' and remove node
						visitors[node_index].count[zoom_level] += visitors[to_node_index].count[zoom_level];
						visitors[to_node_index].count[zoom_level] = null;
					} else if(visitors[to_node_index].count[zoom_level] !== null) { //add node count to 'to node count' and remove node
						visitors[to_node_index].count[zoom_level] += visitors[node_index].count[zoom_level];
						visitors[node_index].count[zoom_level] = null;
					}
				}
			}
		}

		postMessage(visitors);

	};
}

Main();

	
function MetrePerPixel(centre_lat, zoom){
	return 156543.03392 * Math.cos(centre_lat * Math.PI / 180) / Math.pow(2, zoom);
}
