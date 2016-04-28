//http://localhost/radumta_folder/production/crmprod/#/detailjadwalkunjungan/212
//angular/partial/salesman/detailcustomer.html
myAppModule.controller("DetailJadwalKunjunganController", ["$rootScope","$scope", "$location","$http", "authService", "auth","$window","$routeParams","NgMap","LocationService","$cordovaBarcodeScanner","$cordovaCamera","$cordovaCapture","apiService","singleapiService","ngToast","$mdDialog","$filter","sweet","ModalService","resolvesingledetailkunjunganbyiddetail","SummaryService","ProductService","resolvegpslocation","CheckInService","CheckOutService","InventoryService","JadwalKunjunganService","GambarService","ExpiredService","$timeout",
function ($rootScope,$scope, $location, $http, authService, auth,$window,$routeParams,NgMap,LocationService,$cordovaBarcodeScanner,$cordovaCamera,$cordovaCapture,apiService,singleapiService,ngToast,$mdDialog,$filter,sweet,ModalService,resolvesingledetailkunjunganbyiddetail,SummaryService,ProductService,resolvegpslocation,CheckInService,CheckOutService,InventoryService,JadwalKunjunganService,GambarService,ExpiredService,$timeout) 
{
    var status={};
    status.bgcolor="bg-aqua";
    status.icon="fa fa-close bg-aqua";
    status.show = false;
    $rootScope.statusbarangstockqty = status;
    $rootScope.statusbarangsellout = status;
    $rootScope.statusbarangsellin   = status;
    $rootScope.statusbarangexpired = status;
    $rootScope.statusstartpicture = status;
    $rootScope.statusendpicture = status;
    $rootScope.statusmessageskunjungan = status;

    var iddetail = $routeParams.iddetailkunjungan;
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    var url = $rootScope.linkurl;

    var idsalesman  = auth.id;

    var tanggalsekarang = $filter('date')(new Date(),'yyyy-MM-dd');
    var tanggalinventory = $filter('date')(new Date(),'yyyy-MM-dd');

    $scope.zoomvalue = 17;
    var geocoder = new google.maps.Geocoder;    
    var y  = resolvesingledetailkunjunganbyiddetail.DetailKunjungan[0];

    $scope.googlemaplat     = resolvegpslocation.latitude;    //get from gps
    $scope.googlemaplong    = resolvegpslocation.longitude;  //get from gps

    $scope.CUST_MAP_LAT      = y.MAP_LAT;
    $scope.CUST_MAP_LNG      = y.MAP_LNG;
    $scope.blabla            = y.CUST_NM;

    var ID_DETAIL           = y.ID;
    var DEFAULT_CUST_LONG   = y.MAP_LNG;
    var DEFAULT_CUST_LAT    = y.MAP_LAT;
    var PLAN_TGL_KUNJUNGAN  = y.TGL;
    var CUST_ID             = y.CUST_ID;

    var longitude1     = $scope.googlemaplat;
    var latitude1      = $scope.googlemaplong;

    var longitude2     = DEFAULT_CUST_LAT;
    var latitude2      = DEFAULT_CUST_LONG;
    var jarak = $rootScope.jaraklokasi(longitude1,latitude1,longitude2,latitude2);

    // SUMMARY FUNCTION
    //###############################################################################
    $scope.summary = function()
    {
        $scope.loading = true;
        SummaryService.datasummarypercustomer(PLAN_TGL_KUNJUNGAN,CUST_ID,idsalesman)
        .then(function (data)
        {
            $scope.BarangSummary = data.InventorySummary;
            $scope.loading = false;
        });
    };
    // CHECK-IN FUNCTION
    //###########################################################################################
    $scope.checkin = function()
    {
        var detail = {};
        var checkintime         = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        detail.LAT              = $scope.googlemaplat;
        detail.LAG              = $scope.googlemaplong;
        detail.RADIUS           = jarak;
        detail.CHECKIN_TIME     = checkintime;
        detail.CREATE_BY        = idsalesman;
        detail.CREATE_AT        = checkintime;
        detail.STATUS           = 1;

        CheckInService.setCheckinAction(ID_DETAIL,detail)
        .then(function(data)
        {
            ngToast.create('Anda Berhasil Check In');
        });

        var statuskunjungan = {};
        statuskunjungan.ID_DETAIL               = ID_DETAIL;
        statuskunjungan.TGL                     = PLAN_TGL_KUNJUNGAN;
        statuskunjungan.USER_ID                 = idsalesman;
        statuskunjungan.CUST_ID                 = CUST_ID;
        statuskunjungan.CHECK_IN                = 1;

        CheckInService.updateCheckinStatus(ID_DETAIL,statuskunjungan)
        .then(function(data)
        {
            console.log("Check In Status Sukses");
        });           
    };
    $scope.checkin();
    //############################################################################################
    $scope.checkout = function()
    {
        sweet.show({
            title: 'Checkout',
            text: 'Apakah Kamu Yakin Untuk Checkout?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes',
            closeOnConfirm: true
        }, 
        function() 
        {
            var checkouttime = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
            var detail={};
            detail.CHECKOUT_LAT              = $scope.googlemaplat;
            detail.CHECKOUT_LAG              = $scope.googlemaplong;
            detail.CHECKOUT_TIME             = checkouttime;
            detail.UPDATE_BY                 = idsalesman;

            CheckOutService.setCheckoutAction(ID_DETAIL,detail)
            .then(function(data)
            {
                var statuskunjungan = {};
                statuskunjungan.CHECK_OUT = 1;

                CheckOutService.updateCheckoutStatus(ID_DETAIL,statuskunjungan)
                .then(function(data,status)
                {
                    sweet.show({
                                    title: 'Success!',
                                    text: 'Kamu Berhasil Checkout',
                                    timer: 2000,
                                    showConfirmButton: false
                                });
                    $scope.loading = true;
                    $timeout($location.path('/agenda/'+ PLAN_TGL_KUNJUNGAN),2000);
                });
                
            });

            
        });
        
    };
    //#############################################################################################
    JadwalKunjunganService.GetJustStatusKunjungan(ID_DETAIL)
    .then(function (data)
    {
        var statusstartpic              = ((data.START_PIC == null         || data.START_PIC == 0) ? 0 : 1);
        var statusendpic                = ((data.END_PIC == null           || data.END_PIC == 0) ? 0 : 1);
        var statusinventorystock        = ((data.INVENTORY_STOCK == null   || data.INVENTORY_STOCK == 0) ? 0 : 1);
        var statusinventorysellin       = ((data.INVENTORY_SELLIN == null  || data.INVENTORY_SELLIN == 0) ? 0 : 1);
        var statusinventorysellout      = ((data.INVENTORY_SELLOUT == null || data.INVENTORY_SELLOUT == 0) ? 0 : 1);
        var statusinventoryexpired      = ((data.INVENTORY_EXPIRED == null || data.INVENTORY_EXPIRED == 0) ? 0 : 1);

        $rootScope.statusstartpicture   = $rootScope.cekstatusbarang(statusstartpic);
        $rootScope.statusendpicture     = $rootScope.cekstatusbarang(statusendpic);
        $rootScope.statusbarangstockqty = $rootScope.cekstatusbarang(statusinventorystock);
        $rootScope.statusbarangsellin   = $rootScope.cekstatusbarang(statusinventorysellin);
        $rootScope.statusbarangsellout  = $rootScope.cekstatusbarang(statusinventorysellout);
        $rootScope.statusbarangexpired  = $rootScope.cekstatusbarang(statusinventoryexpired);
    });
    //#############################################################################################
    ProductService.GetDataBarangs()
    .then(function (result) 
    {
        var databarangall = result;
        ExpiredService.setExpiredAction(ID_DETAIL)
        .then (function (data)
        {
            var x           = $rootScope.diffbarang(databarangall,data);
            $rootScope.barangexpired   = [];
            var objectdatabarangall = $rootScope.objectdatabarangs();
            angular.forEach(x, function(value, key)
            {
                var existingFilter = _.findWhere(objectdatabarangall, { KD_BARANG: value.KD_BARANG });
                $rootScope.barangexpired.push(existingFilter);
            });
        });
    });

    ProductService.GetDataBarangs()
    .then(function (result) 
    {
        var databarangall = result;
        ProductService.GetDataBarangsInventory(CUST_ID,PLAN_TGL_KUNJUNGAN,5)
        .then(function (result) 
        {
            var x      = $rootScope.diffbarang(databarangall,result);
            var objectdatabarangall = $rootScope.objectdatabarangs();
            $rootScope.barangstockqty = [];
            angular.forEach(x, function(value, key)
            {
                var existingFilter = _.findWhere(objectdatabarangall, { KD_BARANG: value.KD_BARANG });
                $rootScope.barangstockqty.push(existingFilter);
            });
        });
        ProductService.GetDataBarangsInventory(CUST_ID,PLAN_TGL_KUNJUNGAN,6)
        .then(function (result) 
        {
            var x      = $rootScope.diffbarang(databarangall,result);
            var objectdatabarangall = $rootScope.objectdatabarangs();
            $rootScope.barangsellin = [];
            angular.forEach(x, function(value, key)
            {
                var existingFilter = _.findWhere(objectdatabarangall, { KD_BARANG: value.KD_BARANG });
                $rootScope.barangsellin.push(existingFilter);
            });
        });
        ProductService.GetDataBarangsInventory(CUST_ID,PLAN_TGL_KUNJUNGAN,7)
        .then(function (result) 
        {
            var x      = $rootScope.diffbarang(databarangall,result);
            var objectdatabarangall = $rootScope.objectdatabarangs();
            $rootScope.barangsellout = [];
            angular.forEach(x, function(value, key)
            {
                var existingFilter = _.findWhere(objectdatabarangall, { KD_BARANG: value.KD_BARANG });
                $rootScope.barangsellout.push(existingFilter);
            });
        });
    });
    // ####################################################################################################
    $scope.updateinventoryqty = function(barang,index,idinventory)
    {
        var resultupdateinventoryqty = $rootScope.updateinventoryquantity(idinventory);
        // if(tanggalsekarang == PLAN_TGL_KUNJUNGAN)
        // {
            namaproduct = barang.NM_BARANG;
            sweet.show(
            {
                title: resultupdateinventoryqty.titledialog,
                text: namaproduct,
                type: 'input',
                showCancelButton: true,
                closeOnConfirm: false,
                animation: false,
                inputPlaceholder: 'Quantity/PCS'
            }, 
            function(inputValue) 
            {
                if(/^\d+$/.test(inputValue))
                {
                    
                }
                else
                {
                    var bukannumber = false;
                }

                if (inputValue === false)
                {
                    return false;
                }

                if ( (inputValue === '') || (bukannumber === false ) )
                {
                    sweet.showInputError('Ini Harus Diisi Dan Harus Angka!');
                    return false;
                }
                
                else
                {
                    var detail={};
                    detail.SO_TYPE      = resultupdateinventoryqty.sotype;
                    detail.TGL          = PLAN_TGL_KUNJUNGAN;
                    detail.CUST_KD      = CUST_ID;
                    detail.KD_BARANG    = barang.KD_BARANG;
                    detail.POS          = 'ANDROID';
                    detail.USER_ID      = idsalesman;
                    detail.SO_QTY       = inputValue;

                    InventoryService.setInventoryAction(detail)
                    .then(function (result) 
                    {
                        sweet.show({
                                        title: 'Saved',
                                        type: 'success',
                                        timer: 20,
                                        showConfirmButton: false
                                    });

                        resultupdateinventoryqty.arraybarang.splice(index,1);
                        if(resultupdateinventoryqty.arraybarang.length == 0)
                        {
                            var status={};
                            status.bgcolor="bg-green";
                            status.icon="fa fa-check bg-green";
                            status.show = false;

                            if(idinventory == 1)
                            {
                                $rootScope.statusbarangstockqty = status
                            }
                            else if(idinventory == 2)
                            {
                                $rootScope.statusbarangsellout = status
                            }
                            else if(idinventory == 3)
                            {
                                $rootScope.statusbarangsellin = status
                            }

                            var statuskunjungan = $rootScope.updatestatusinventoryquantity(idinventory);
                            InventoryService.updateInventoryStatus(ID_DETAIL,statuskunjungan)
                            .then(function(data)
                            {
                                ngToast.create('Status Inventory Berhasil Di Update');
                            });
                        }
                    });
                    
                }
            });
        // }
        // else if(tanggalsekarang > PLAN_TGL_KUNJUNGAN)
        // {
        //     alert("Kamu Tidak Bisa Lagi Melakukan Update Stock");
        // }
        // else
        // {
        //     alert("Kamu Belum Bisa Melakukan Update Stock");
        // }
    }
    //#####################################################################################################
    $scope.starttakeapicture = function()
    {
        document.addEventListener("deviceready", function () 
        {
          var options = $rootScope.getCameraOptions();
          $cordovaCamera.getPicture(options).then(function (imageData) 
          {
            var status = {};
            status.bgcolor          = "bg-green";
            status.icon             = "fa fa-check bg-green";
            $rootScope.statusstartpicture = status;

            var timeimagestart = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
            
            var gambarkunjungan={};
            gambarkunjungan.ID_DETAIL           = ID_DETAIL;
            gambarkunjungan.IMG_NM_START        = "gambar start";
            gambarkunjungan.IMG_DECODE_START    = imageData;
            gambarkunjungan.TIME_START          = timeimagestart;
            gambarkunjungan.STATUS              = 1;
            gambarkunjungan.CREATE_BY           = idsalesman;

            GambarService.setGambarAction(ID_DETAIL,gambarkunjungan)
            .then(function (data)
            {
                ngToast.create('Gambar Telah Berhasil Di Update');
                var statuskunjungan = {};
                statuskunjungan.START_PIC = 1;

                GambarService.updateGambarStatus(ID_DETAIL,statuskunjungan)
                .then(function (data)
                {
                    console.log(data);
                });
            });

          }, 
          function(err) 
          {
                alert("Error While Take A Picture");
          });

        }, false);
    }
    //#####################################################################################################
    $scope.endtakeapicture = function()
    {
        document.addEventListener("deviceready", function () 
        {
            var options = {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
              };
              
            $cordovaCamera.getPicture(options).then(function(imageData) 
            {
                var timeimageend = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                var gambarkunjungan={};

                gambarkunjungan.IMG_NM_END      = "gambar end";
                gambarkunjungan.IMG_DECODE_END  = imageData;
                gambarkunjungan.TIME_END        = timeimageend;
                gambarkunjungan.ID_DETAIL       = ID_DETAIL;
                gambarkunjungan.UPDATE_BY       = idsalesman;


                GambarService.setEndGambarAction(ID_DETAIL,gambarkunjungan)
                .then(function (data)
                {
                    ngToast.create('Gambar Telah Berhasil Di Update');
                    var status = {};
                    status.bgcolor          = "bg-green";
                    status.icon             = "fa fa-check bg-green";
                    $rootScope.statusendpicture = status;

                    var statuskunjungan = {};
                    statuskunjungan.END_PIC = 1;

                    GambarService.updateGambarStatus(ID_DETAIL,statuskunjungan)
                    .then(function (data)
                    {
                        console.log(data);
                    });
                }); 
            }, 
            function(err) 
            {
                alert("Error While Take A Picture");
            });
        }, false);
    }
    //#####################################################################################################
    $scope.messageskunjungandisabled = false;
    $http.get(url + "/messageskunjungans/search?ID_DETAIL=" + ID_DETAIL)
    .success(function(data,status, headers, config) 
    {
        $scope.salesmanmemo = data.Messageskunjungan[0];
        var status = {};
        status.bgcolor="bg-green";
        status.icon="fa fa-check bg-green";
        $rootScope.statusmessageskunjungan = status;
        $scope.messageskunjungandisabled = true;
    })
    .error(function(err,status)
    {
        $scope.messageskunjungandisabled = false;
    })
    .finally(function()
    {
        $scope.loading = false;  
    });

    $scope.submitForm = function(formsalesmanmemo)
    {

        $scope.loading = true;
        var memodibuatpada         = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
        var salesmanmemo = {};
        salesmanmemo.ID_DETAIL          = y.ID;
        salesmanmemo.KD_CUSTOMER        = y.CUST_ID;
        salesmanmemo.NM_CUSTOMER        = y.CUST_NM;
        salesmanmemo.TGL                = $filter('date')(new Date(),'yyyy-MM-dd');


        salesmanmemo.ISI_MESSAGES       = formsalesmanmemo.ISI_MESSAGES
        salesmanmemo.ID_USER            = auth.id;
        salesmanmemo.NM_USER            = auth.username;
        salesmanmemo.STATUS_MESSAGES    = "URGENT";
        salesmanmemo.CREATE_AT          = memodibuatpada;
        salesmanmemo.CREATE_BY          = auth.id;

        var result              = $rootScope.seriliazeobject(salesmanmemo);
        var serialized          = result.serialized;
        var config              = result.config;

        $http.post(url + "/messageskunjungans",serialized,config)
        .success(function(data,status, headers, config) 
        {
            ngToast.create('Memo Kunjungan Berhasil Di Save');
            $scope.messageskunjungandisabled = true;
            var status = {};
            status.bgcolor="bg-green";
            status.icon="fa fa-check bg-green";
            $rootScope.statusmessageskunjungan = status;
        })
        .finally(function()
        {
            $scope.loading = false;  
        });
    }
    //#####################################################################################################
    $scope.showmodal = function(barang,index) 
    {
        // if(tanggalsekarang == PLAN_TGL_KUNJUNGAN)
        // {
            ModalService
            .showModal(
            {
              templateUrl: "angular/partial/salesman/complexmodal.html",
              controller: "ComplexController",
              inputs: 
              {
                title: barang.NM_BARANG
              }
            })
            .then(function(modal) 
            {
              modal.element.modal(function ()
                {
                    alert("Button OK Klick");
                });
              modal.close.then(function(result) 
              {
                var kodebarang     = barang.KD_BARANG;

                for(var i = 0; i < result.list.length ; i ++)
                {
                    var tanggalexpired = result.list[i].tanggaled;
                    var expiredqty     = result.list[i].expiredqty;
                    var prioritas      = result.list[i].prioritas;

                    if(tanggalexpired != null && expiredqty != null)
                    {
                        var tglexpd = $filter('date')(tanggalexpired,'yyyy-MM-dd'); 

                        var detailexpired = {};
                        detailexpired.ID_PRIORITASED    = prioritas;
                        detailexpired.ID_DETAIL         = ID_DETAIL;
                        detailexpired.CUST_ID           = CUST_ID;
                        detailexpired.BRG_ID            = kodebarang;
                        detailexpired.USER_ID           = idsalesman;
                        detailexpired.TGL_KJG           = PLAN_TGL_KUNJUNGAN;
                        detailexpired.QTY               = expiredqty;
                        detailexpired.DATE_EXPIRED      = tanggalexpired;
                        detailexpired.CREATE_BY         = idsalesman;

                        var expiredproduct              = $rootScope.seriliazeobject(detailexpired);
                        var serialized                  = expiredproduct.serialized;
                        var config                      = expiredproduct.config;

                        $http.post(url + "/expiredproducts",serialized,config)
                        .success(function(data,status, headers, config) 
                        {
                            
                        })

                        .finally(function()
                        {
                            $scope.loading = false;  
                        }); 
                    }
                    else
                    {
                        alert("Tidak Sukses");
                    }
                }
                ngToast.create("Expired Product Telah Diupdate");

                $rootScope.barangexpired.splice(index,1);
                if($rootScope.barangexpired.length == 0)
                {
                    var status={};
                    status.bgcolor="bg-green";
                    status.icon="fa fa-check bg-green";
                    status.show = false;
                    $rootScope.statusbarangexpired = status;

                    var idstatuskunjungan   = $rootScope.findidstatuskunjunganbyiddetail(ID_DETAIL);
                    var statuskunjungan = {};
                    statuskunjungan.INVENTORY_EXPIRED = 1;

                    var resultstatus            = $rootScope.seriliazeobject(statuskunjungan);
                    var serialized              = resultstatus.serialized;
                    var config                  = resultstatus.config;

                    $http.put(url + "/statuskunjungans/"+ idstatuskunjungan,serialized,config)
                    .success(function(data,status, headers, config) 
                    {
                        // ngToast.create('Anda Telah Berhasil Check In');
                    })
                    .finally(function()
                    {
                        $scope.loading = false;  
                    }); 
                }
              });
            });
        //}
        // else if(tanggalsekarang > PLAN_TGL_KUNJUNGAN)
        // {
        //     alert("Kamu Tidak Bisa Lagi Melakukan Update Product Expired");
        // }
        // else
        // {
        //     alert("Kamu Belum Bisa Melakukan Update Product Expired");
        // }  
    };
}]);

myAppModule.controller('ComplexController', ['$scope', '$element', 'title', 'close',"$filter",
function($scope, $element, title, close,$filter) 
{

  $scope.title = title;
    var myDate = new Date();
    var previousMonth = new Date(myDate);
    previousMonth.setMonth(myDate.getMonth()-1);

    var nextMonth1 = new Date(myDate);
    nextMonth1.setMonth(myDate.getMonth()+1);
    var nextMonth2 = new Date(myDate);
    nextMonth2.setMonth(myDate.getMonth()+2);
    var nextMonth3 = new Date(myDate);
    nextMonth3.setMonth(myDate.getMonth()+3);

  // var tanggaled = $filter('date')(nextMonth,'yyyy-MM-dd');
  $scope.list = [ {tanggaled:nextMonth1, expiredqty:null, prioritas:1},{tanggaled:nextMonth2, expiredqty:null,prioritas:2},{tanggaled:nextMonth3, expiredqty:null,prioritas:3} ];
  
  $scope.close = function() 
  {
        close({list:$scope.list,title:$scope.title}, 500); // close, but give 500ms for bootstrap to animate
  };

  $scope.cancel = function() 
  {
    $element.modal('hide');
  };
}]);