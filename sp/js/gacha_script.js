var messages = {
    1:'抽選済み',
    2:'当選者数上限',
3:'auスマートパス契約状態取得応答失敗',
    4:'非スマパス既存会員',
    5:'情報取得応答失敗',
    6:'au WALLETカード未所持',
    7:'au WALLETクレカ未所持',
    8:'メルマガ未登録',
    9:'くじ購入金額未達成',
    10:'並行キャンペーン当選済み',
    11:'該当キャンペーン当選済み',
    12:'運用期間外',
99:'想定外エラー'
  };
  function getRequest() {
    if(location.search.length > 1) {
      var get = new Object();
      var ret = location.search.substr(1).split('&');
      for(var i = 0; i < ret.length; i++) {
      var r = ret[i].split('=');
      get[r[0]] = r[1];
      }
      return get;
    } else {
      return false;
    }
  }
  function getMessage(code) {
var message = '';
if(0 < code && code <13) {
message = messages[code];
} else {
message = messages[99];
}
    return message;
  }
  $(function() {
    var get = getRequest();
    var code = get['RESPONSE_CODE'];
var message = getMessage(code);
$('#message').append(message);
  });