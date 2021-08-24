

function get_chem_data(identifier){
	$.get("https://commonchemistry.cas.org/api",{q:identifier},function(data){
		console.log(data);
	},"json").done(function(){
		alert("Success 2");
	}).fail(function(){
		alert("Failure");
	});
}

get_chem_data("ethane");
