define(['app'],function(app){
  'use strict';
  app.register.controller('WalletTrandetailCtrl',[
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$state',
    function($scope,$rootScope,$stateParams,$location,$state){
        $scope.backwalletmainofdetail= function(){
          //$location.url('/asset');
         // $location.url('/asset/wallet_transactiondetail');
          $state.go('wallet_main', {chainida:$stateParams.chainidd});
        }
        //console.log("比重："+$stateParams.chainidd+"交易ID"+$stateParams.txid+"顺序："+$stateParams.noid);
        window.webspvwalletapi.trandetail(function(successd){
           var result =  eval('(' + successd + ')');
           $scope.zzsum = result['amount'];
           $scope.zzfee = result['fee'];
           $scope.zzdate = result['adddate'];
           $scope.inputaddr = result['toaddress'];
           $scope.inputaddr = result['toaddress'];
           $scope.confirmnum = result['confirmnum'];
           $scope.blockheight = result['blockheight'];
           $scope.zztranferid = result['txhash'];
           if(result['inorout']=="in"){
             $("#foriadr").html("输入地址：");
             if(result['confirmstatus']=="Confirmed"){
                    $("#curtxidstatus").html("&#xe8d7;");
                    $("#curtxidstatus").css("background-color","#009933");
                    $("#txidstatustxt").html("收款成功");
             }else{
                    $("#curtxidstatus").html("&#xe680;");
                    $("#txidstatustxt").html("确认中");
             }
           }else{
             $("#foriadr").html("输出地址：");
             if(result['confirmstatus']=="Confirmed"){
                    $("#curtxidstatus").html("&#xe8d7;");
                    $("#curtxidstatus").css("background-color","#009933");
                    $("#txidstatustxt").html("转账成功");
             }else{
                    $("#curtxidstatus").html("&#xe680;");
                    $("#txidstatustxt").html("确认中");
             }
           }
           //https://blockchain.elastos.org/tx/617516f53c89f3e5523b07a44bb37ee1d8a758cf91a46bf0129278a1d7a9bef4
            var qrcode = new QRCode(document.getElementById("txidqrcode"), {
                width : 100,
                height : 100
            });
            qrcode.makeCode("https://blockchain.elastos.org/tx/"+result['txhash']);
        },function(erron){
            console.log("获取交易信息失败！");
        },$stateParams.chainidd,$stateParams.txid,$stateParams.noid);
  }]);
});
