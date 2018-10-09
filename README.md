# dlinkddns-set-public-ip

This utility can be used to set public IP of your router in your dlinkddns.com service.

Many times, internet service provider(ISP) keeps changing your public IP. That means, you will also have to update your domain name to IP address mapping up to date whenever such change happens.

If you have static IP assinged to you by your ISP, then you don't have to do much. Otherwise, you will have to use services of *ddns* providers.

There are several Dynamic DNS services available. www.dlinkddns.com is one of them. This is free for user who has D-Link router.

However, you may not be using D-Link router or some times D-Link router inbuilt feature may not work as expected and then whenever public IP changes, you will not able to access your site using domain name.

# Usage

This is nodejs utility written in JavaScript language.
* Open index.js
* Supply username, password and domain in index.js file 
* On command line, run this utlity as shown below

```
$ npm install --no-optional
$ node index.js
```

You should configure this utility as part of crone job as well.


