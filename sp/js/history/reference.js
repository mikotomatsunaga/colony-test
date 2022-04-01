var locs = "12021";
  var displaytype = 1;
  var adtype = "RECT";
  var random = new Date();
  var js_url = 'http://i.socdm.com/sdk/js/adg-script-client.js?id=' +
      locs + '&rnd=' + random.getTime() +
      '&displayid=' + displaytype +
      '&adType=' + adtype +
      '&targetID=adg_12021' +
      '&acl=off';
  document.write('<sc' + 'ript language="JavaScript" type="text/javascript" src="' + js_url + '">');
  document.write('</sc' + 'ript>');

  var adcon = document.getElementById("adg_12021");
  var frm = document.createElement("iframe");
  frm.id = "adg_12021" + "_iframe";
  frm.style.border = "none";
  frm.style.width = "300px";
  frm.style.height = "250px";
  frm.style.overflow = "hidden";
  frm.style.margin = "0px auto";
  frm.scrolling="no";
  frm.src = "http://d.socdm.com/adsv/v1?posall=SSPLOC&id=12021&tp=" + encodeURIComponent(location.href) + "&targetID=adg_12021&sdktype=0" + "&rnd=" + random +"&pp=" + encodeURIComponent(document.referrer);
  adcon.appendChild(frm);

(function() {
  var so_src = ('https:' == document.location.protocol ? 'https://ssl.socdm.com' : 'http://tg.socdm.com') + '/so.js?' + 'siteid=9327';
  var so_script = '<scr'+'ipt type="text/javascript" src="'+so_src+'"></scr'+'ipt>';
  document.write(so_script);
})();
