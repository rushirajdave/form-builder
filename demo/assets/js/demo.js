jQuery(document).ready(function($) {
  
  var template = document.getElementById('fb-template'),
    $buildWrap = $(document.querySelector('.build-wrap')),
    renderWrap = document.querySelector('.render-wrap'),
    editBtn = document.getElementById('edit-form'),
    editing = true;

  var toggleEdit = function() {
    document.body.classList.toggle('editing-form', editing);
    $buildWrap.toggle();
    $(renderWrap).toggle();
    editing = !editing;
  };

  $(template).formBuilder();

  $('.form-builder-save').click(function() {
    toggleEdit();
    $(template).formRender({
      container: renderWrap
    });
  });

  editBtn.onclick = function() {
    //toggleEdit();
parseHtml();
  };
});




function parseHtml(){

$('.form-group').each(function(i, obj) {
   $("#abcd").append($(this).attr('class')+"<br/>");
    var eleClass = $(this).attr('class');
        var outerClass = eleClass =  eleClass.replace("form-group ", "");
        eleClass =  eleClass.replace(/-\d+/g, '');

        var iClass = $("."+outerClass+" input").attr("class");
        var iName = $("."+outerClass+" input").attr("name");
        var iId = $("."+outerClass+" input").attr("id");
        var iId = $("."+outerClass+" select").attr("id");
        var iLabel = $("."+outerClass+" label").text();
        var isRequired = checkRequired($("."+outerClass+" input"));
        jsonObj = [];

        item = {}
        item ["iClass"] = iClass;
        item ["iName"] = iName;
        item ["iId"] = iId;
        item ["iLabel"] = iLabel;
        item ["isRequired"] = isRequired;
       

     switch(eleClass)
      {
         case 'field-text':
                      console.log("Matched the 'field-text' substring");
                      var iPlaceholder = $("."+outerClass+" input").attr("placeholder");
                      var iType = $("."+outerClass+" input").attr("type");
                      item ["iType"] = iType;
                      item ["iPlaceholder"] = iPlaceholder;
                      jsonObj.push(item);
   break;
         case 'field-checkbox':
                      var iType = $("."+outerClass+" input").attr("type");
                      var iToggle = $("."+outerClass+" input").attr("toggle");
                      item ["iType"] = iType;
                      item ["iToggle"] = iToggle;
                      jsonObj.push(item);
      
   break;
          case 'field-file':
                    var iType = $("."+outerClass+" input").attr("type");
                    jsonObj.push(item);     
          break;

          case 'field-select':
                    var iType = $("."+outerClass+" select").attr("type");
                    var iPlaceholder = $("."+outerClass+" select").attr("placeholder");
                    var iType = $("."+outerClass+" select").attr("multiple");
                     item ["iType"] = iType;
                      item ["iPlaceholder"] = iPlaceholder;
                       item ["iType"] = iType;
                    var opt_vals = [];
                    $("#"+ iId + ' option').each(function() {
                    opt_vals.push((this).value);
                    opt_vals.push((this).text);
                    });
                  jsonObj.push(item);                     
    break;
      }
//console.log(i + ":"+ $(obj).html()+"<br/>");
// console.log(jsonObj);
});
}

function checkRequired(objParam)
{
var attr = $(objParam).attr('required');
if (typeof attr !== typeof undefined && attr !== false) {
return true;
}
return false;
}


