# React Native Firebase integration Demo for iOS

During my first React Native prototype project I couldn't find a good example of Firebase working with React Native. Instructions described here: https://www.firebase.com/blog/2015-05-29-react-native.html didn't work as described for me.

I wrote this example based on Firebase official docs and demo: 

https://github.com/firebase/login-demo-ios 
https://github.com/firebase/firebase-simple-login-objc/blob/master/docs/v1/providers/twitter.md

Objective-C is far from being my main expersite (please, don't take this doc as reference for good practices) With a little bit of work, I managed to expose a React Bridge containing a few methods that allowed me to authenticate with Twitter and persist the user in my Firebase database. It also contains an example on how to fetch data from a react native component using Firebase REST API.

This demo implements Firebase's authentication features and it focuses on Twitter Oauth methods.
Note that Firebase also supports authentication with email & password and custom auth tokens as well as other providers (Facebook, Linkedin, Google, etc.)
You can read the full [iOS authentication guide here](https://www.firebase.com/docs/ios/guide/user-auth.html).

This demo requires that [Cocoapods](https://cocoapods.org/) is installed.

Running the Demo
----------------

Donwload the repository and run the following command in the root folder:

	$ npm install

To download and setup all necessary SDKs, run the following command within ./ios/:

    $ pod install

Next, open `reactAndFireBase.xcworkspace` in XCode (not `reactAndFireBase.xcodeproj`,
since you need to include the Cocoapod dependencies).

You'll then need to edit the files `reactAndFirebase/ViewController.m` and specify the
Firebase app you're using as well as your Twitter API key. 

Don't forget to [enable the relevant OAuth providers](https://www.firebase.com/docs/ios/guide/user-auth.html#section-enable-providers)
in your Firebase app.

Finally, run the demo app in XCode.

React Version: ^0.11.4

Troubleshooting
----------------
If your build fails, check that pod install had run successfuly. If the console throws this warning, most likely you will have to follow the instructions and then re-run the command. 

[!] The `reactAndFirebase [Debug]` target overrides the `OTHER_LDFLAGS` build setting defined in `Pods/Target Support Files/Pods/Pods.debug.xcconfig'. This can lead to problems with the CocoaPods installation
    - Use the `$(inherited)` flag, or
    - Remove the build settings from the target.

[!] The `reactAndFirebase [Release]` target overrides the `OTHER_LDFLAGS` build setting defined in `Pods/Target Support Files/Pods/Pods.release.xcconfig'. This can lead to problems with the CocoaPods installation
    - Use the `$(inherited)` flag, or
    - Remove the build settings from the target.

I had to remove the Tests from the project as well to get it working.
