angular.module('juiceShop').controller('SearchResultController', [
  '$scope',
  '$sce',
  '$window',
  '$uibModal',
  '$location',
  '$translate',
  'ProductService',
  'BasketService',
  function ($scope, $sce, $window, $uibModal, $location, $translate, productService, basketService) {
    'use strict'

    $scope.showDetail = function (id) {
      $uibModal.open({
        templateUrl: 'views/ProductDetail.html',
        controller: 'ProductDetailsController',
        size: 'lg',
        resolve: {
          id: function () {
            return id
          }
        }
      })
    }

    $scope.addToBasket = function (id) {
      basketService.find($window.sessionStorage.bid).then(function (basket) {
        var productsInBasket = basket.Products
        var found = false
        for (var i = 0; i < productsInBasket.length; i++) {
          if (productsInBasket[i].id === id) {
            found = true
            basketService.get(productsInBasket[i].BasketItem.id).then(function (existingBasketItem) {
              var newQuantity = existingBasketItem.quantity + 1
              basketService.put(existingBasketItem.id, {quantity: newQuantity}).then(function (updatedBasketItem) {
                productService.get(updatedBasketItem.ProductId).then(function (product) {
                  $translate('BASKET_ADD_SAME_PRODUCT', {product: product.name}).then(function (basketAddSameProduct) {
                    $scope.confirmation = basketAddSameProduct
                  }, function (translationId) {
                    $scope.confirmation = translationId
                  }).catch(angular.noop)
                }).catch(function (err) {
                  console.log(err)
                })
              }).catch(function (err) {
                console.log(err)
              })
            }).catch(function (err) {
              console.log(err)
            })
            break
          }
        }
        if (!found) {
          basketService.save({ProductId: id, BasketId: $window.sessionStorage.bid, quantity: 1}).then(function (newBasketItem) {
            productService.get(newBasketItem.ProductId).then(function (product) {
              $translate('BASKET_ADD_PRODUCT', {product: product.name}).then(function (basketAddProduct) {
                $scope.confirmation = basketAddProduct
              }, function (translationId) {
                $scope.confirmation = translationId
              }).catch(angular.noop)
            }).catch(function (err) {
              console.log(err)
            })
          }).catch(function (err) {
            console.log(err)
          })
        }
      }).catch(function (err) {
        console.log(err)
      })
    }

    // Mock API Call
    $scope.products = [{"id":1,"name":"Apple Juice (1000ml)","description":"The all-time classic.","price":1.99,"image":"apple_juice.jpg","createdAt":"2018-05-21 07:32:48.854 +00:00","updatedAt":"2018-05-21 07:32:48.854 +00:00","deletedAt":null},{"id":23,"name":"Apple Pomace","description":"Finest pressings of apples. Allergy disclaimer: Might contain traces of worms. Can be <a href=\"/#recycle\">sent back to us</a> for recycling.","price":0.89,"image":"apple_pressings.jpg","createdAt":"2018-05-21 07:32:48.857 +00:00","updatedAt":"2018-05-21 07:32:48.857 +00:00","deletedAt":null},{"id":6,"name":"Banana Juice (1000ml)","description":"Monkeys love it the most.","price":1.99,"image":"banana_juice.jpg","createdAt":"2018-05-21 07:32:48.855 +00:00","updatedAt":"2018-05-21 07:32:48.855 +00:00","deletedAt":null},{"id":29,"name":"Carrot Juice (1000ml)","description":"As the old German saying goes: \"Carrots are good for the eyes. Or has anyone ever seen a rabbit with glasses?\"","price":2.99,"image":"carrot_juice.jpeg","createdAt":"2018-05-21 07:32:48.858 +00:00","updatedAt":"2018-05-21 07:32:48.858 +00:00","deletedAt":null},{"id":3,"name":"Eggfruit Juice (500ml)","description":"Now with even more exotic flavour.","price":8.99,"image":"eggfruit_juice.jpg","createdAt":"2018-05-21 07:32:48.854 +00:00","updatedAt":"2018-05-21 07:32:48.854 +00:00","deletedAt":null},{"id":24,"name":"Fruit Press","description":"Fruits go in. Juice comes out. Pomace you can send back to us for recycling purposes.","price":89.99,"image":"fruit_press.jpg","createdAt":"2018-05-21 07:32:48.857 +00:00","updatedAt":"2018-05-21 07:32:48.857 +00:00","deletedAt":null},{"id":21,"name":"Green Smoothie","description":"Looks poisonous but is actually very good for your health! Made from green cabbage, spinach, kiwi and grass.","price":1.99,"image":"green_smoothie.jpg","createdAt":"2018-05-21 07:32:48.857 +00:00","updatedAt":"2018-05-21 07:32:48.857 +00:00","deletedAt":null},{"id":26,"name":"Juice Shop Artwork","description":"Unique masterpiece painted with different kinds of juice on 90g/m² lined paper.","price":278.74,"image":"artwork.jpg","createdAt":"2018-05-21 07:32:48.857 +00:00","updatedAt":"2018-05-21 07:32:48.857 +00:00","deletedAt":null},{"id":5,"name":"Lemon Juice (500ml)","description":"Sour but full of vitamins.","price":2.99,"image":"lemon_juice.jpg","createdAt":"2018-05-21 07:32:48.855 +00:00","updatedAt":"2018-05-21 07:32:48.855 +00:00","deletedAt":null},{"id":32,"name":"Melon Bike (Comeback-Product 2018 Edition)","description":"The wheels of this bicycle are made from real water melons. You might not want to ride it up/down the curb too hard.","price":2999,"image":"melon_bike.jpeg","createdAt":"2018-05-21 07:32:48.858 +00:00","updatedAt":"2018-05-21 07:32:48.858 +00:00","deletedAt":null},{"id":8,"name":"OWASP Juice Shop CTF Girlie-Shirt","description":"For serious Capture-the-Flag heroines only!","price":22.49,"image":"fan_girlie.jpg","createdAt":"2018-05-21 07:32:48.855 +00:00","updatedAt":"2018-05-21 07:32:48.855 +00:00","deletedAt":null},{"id":18,"name":"OWASP Juice Shop Hoodie","description":"Mr. Robot-style apparel. But in black. And with logo.","price":49.99,"image":"fan_hoodie.jpg","createdAt":"2018-05-21 07:32:48.856 +00:00","updatedAt":"2018-05-21 07:32:48.856 +00:00","deletedAt":null},{"id":12,"name":"OWASP Juice Shop Iron-Ons (16pcs)","description":"Upgrade your clothes with washer safe <a href=\"https://www.stickeryou.com/products/owasp-juice-shop/794\" target=\"_blank\">iron-ons</a> of the OWASP Juice Shop or CTF Extension logo!","price":14.99,"image":"iron-on.jpg","createdAt":"2018-05-21 07:32:48.856 +00:00","updatedAt":"2018-05-21 07:32:48.856 +00:00","deletedAt":null},{"id":25,"name":"OWASP Juice Shop Logo (3D-printed)","description":"This rare item was designed and handcrafted in Sweden. This is why it is so incredibly expensive despite its complete lack of purpose.","price":99.99,"image":"3d_keychain.jpg","createdAt":"2018-05-21 07:32:48.857 +00:00","updatedAt":"2018-05-21 07:32:48.857 +00:00","deletedAt":null},{"id":13,"name":"OWASP Juice Shop Magnets (16pcs)","description":"Your fridge will be even cooler with these OWASP Juice Shop or CTF Extension logo <a href=\"https://www.stickeryou.com/products/owasp-juice-shop/794\" target=\"_blank\">magnets</a>!","price":15.99,"image":"magnets.jpg","createdAt":"2018-05-21 07:32:48.856 +00:00","updatedAt":"2018-05-21 07:32:48.856 +00:00","deletedAt":null},{"id":17,"name":"OWASP Juice Shop Mug","description":"Black mug with regular logo on one side and CTF logo on the other! Your colleagues will envy you!","price":21.99,"image":"fan_mug.jpg","createdAt":"2018-05-21 07:32:48.856 +00:00","updatedAt":"2018-05-21 07:32:48.856 +00:00","deletedAt":null},{"id":14,"name":"OWASP Juice Shop Sticker Page","description":"Massive decoration opportunities with these OWASP Juice Shop or CTF Extension <a href=\"https://www.stickeryou.com/products/owasp-juice-shop/794\" target=\"_blank\">sticker pages</a>! Each page has 16 stickers on it.","price":9.99,"image":"sticker_page.jpg","createdAt":"2018-05-21 07:32:48.856 +00:00","updatedAt":"2018-05-21 07:32:48.856 +00:00","deletedAt":null},{"id":15,"name":"OWASP Juice Shop Sticker Single","description":"Super high-quality vinyl <a href=\"https://www.stickeryou.com/products/owasp-juice-shop/794\" target=\"_blank\">sticker single</a> with the OWASP Juice Shop or CTF Extension logo! The ultimate laptop decal!","price":4.99,"image":"sticker_single.jpg","createdAt":"2018-05-21 07:32:48.856 +00:00","updatedAt":"2018-05-21 07:32:48.856 +00:00","deletedAt":null},{"id":7,"name":"OWASP Juice Shop T-Shirt","description":"Real fans wear it 24/7!","price":22.49,"image":"fan_shirt.jpg","createdAt":"2018-05-21 07:32:48.855 +00:00","updatedAt":"2018-05-21 07:32:48.855 +00:00","deletedAt":null},{"id":16,"name":"OWASP Juice Shop Temporay Tattoos (16pcs)","description":"Get one of these <a href=\"https://www.stickeryou.com/products/owasp-juice-shop/794\" target=\"_blank\">temporary tattoos</a> to proudly wear the OWASP Juice Shop or CTF Extension logo on your skin! If you tweet a photo of yourself with the tattoo, you get a couple of our stickers for free! Please mention <a href=\"https://twitter.com/owasp_juiceshop\" target=\"_blank\"><code>@owasp_juiceshop</code></a> in your tweet!","price":14.99,"image":"tattoo.jpg","createdAt":"2018-05-21 07:32:48.856 +00:00","updatedAt":"2018-05-21 07:32:48.856 +00:00","deletedAt":null},{"id":19,"name":"OWASP Juice Shop-CTF Velcro Patch","description":"4x3.5\" embroidered patch with velcro backside. The ultimate decal for every tactical bag or backpack!","price":2.92,"image":"velcro-patch.jpg","createdAt":"2018-05-21 07:32:48.857 +00:00","updatedAt":"2018-05-21 07:32:48.857 +00:00","deletedAt":null},{"id":9,"name":"OWASP SSL Advanced Forensic Tool (O-Saft)","description":"O-Saft is an easy to use tool to show information about SSL certificate and tests the SSL connection according given list of ciphers and various SSL configurations. <a href=\"https://www.owasp.org/index.php/O-Saft\" target=\"_blank\">More...</a>","price":0.01,"image":"orange_juice.jpg","createdAt":"2018-05-21 07:32:48.855 +00:00","updatedAt":"2018-05-21 07:32:48.855 +00:00","deletedAt":null},{"id":2,"name":"Orange Juice (1000ml)","description":"Made from oranges hand-picked by Uncle Dittmeyer.","price":2.99,"image":"orange_juice.jpg","createdAt":"2018-05-21 07:32:48.854 +00:00","updatedAt":"2018-05-21 07:32:48.854 +00:00","deletedAt":null},{"id":31,"name":"Pwning OWASP Juice Shop","description":"<em>The official Companion Guide</em> by Björn Kimminich available <a href=\"https://leanpub.com/juice-shop\">for free on LeanPub</a> and <a href=\"https://bkimminich.gitbooks.io/pwning-owasp-juice-shop/content/\">readable online on GitBook</a>!","price":5.99,"image":"cover_small.jpg","createdAt":"2018-05-21 07:32:48.858 +00:00","updatedAt":"2018-05-21 07:32:48.858 +00:00","deletedAt":null},{"id":22,"name":"Quince Juice (1000ml)","description":"Juice of the <em>Cydonia oblonga</em> fruit. Not exactly sweet but rich in Vitamin C.","price":4.99,"image":"quince.jpg","createdAt":"2018-05-21 07:32:48.857 +00:00","updatedAt":"2018-05-21 07:32:48.857 +00:00","deletedAt":null},{"id":4,"name":"Raspberry Juice (1000ml)","description":"Made from blended Raspberry Pi, water and sugar.","price":4.99,"image":"raspberry_juice.jpg","createdAt":"2018-05-21 07:32:48.855 +00:00","updatedAt":"2018-05-21 07:32:48.855 +00:00","deletedAt":null},{"id":28,"name":"Strawberry Juice (500ml)","description":"Sweet & tasty!","price":3.99,"image":"strawberry_juice.jpeg","createdAt":"2018-05-21 07:32:48.858 +00:00","updatedAt":"2018-05-21 07:32:48.858 +00:00","deletedAt":null},{"id":20,"name":"Woodruff Syrup \"Forest Master X-Treme\"","description":"Harvested and manufactured in the Black Forest, Germany. Can cause hyperactive behavior in children. Can cause permanent green tongue when consumed undiluted.","price":6.99,"image":"woodruff_syrup.jpg","createdAt":"2018-05-21 07:32:48.857 +00:00","updatedAt":"2018-05-21 07:32:48.857 +00:00","deletedAt":null}]

    // Allow DOM XSS!
    $scope.searchQuery = $sce.trustAsHtml($location.search().q)

    for (var i = 0; i < $scope.products.length; i++) {
      $scope.products[i].description = $sce.trustAsHtml($scope.products[i].description) // lgtm [js/xss]
    }
  }])
