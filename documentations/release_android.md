# Release Android

To generate the APK, you need to follow this steps from facebook:

```
https://facebook.github.io/react-native/docs/signed-apk-android.html
```

## Generating a signing key 

You can generate a private signing key using keytool. On Windows keytool must be run from `C:\Program Files\Java\jdkx.x.x_x\bin`.

```
$ keytool -genkey -v -keystore osc_keystore.jsk -alias osc_keystore -keyalg RSA -keysize 2048 -validity 10000
```

This command prompts you for passwords for the keystore and key, and to provide the Distinguished Name fields for your key. It then generates the keystore as a file called osc_keystore.jks.

The keystore contains a single key, valid for 10000 days. The alias is a name that you will use later when signing your app, so remember to take note of the alias.

Note: Remember to keep your keystore file private and never commit it to version control.

## Setting up gradle variables 

Place the `osc_keystore.jks` file under the `android/app` directory in your project folder.
Edit the file `~/.gradle/gradle.properties` and add the following (replace ***** with the correct keystore password, alias and key password),

```
OSC_RELEASE_STORE_FILE=osc_keystore.jks
OSC_RELEASE_KEY_ALIAS=osc_keystore
OSC_RELEASE_STORE_PASSWORD=MitraisCDC
OSC_RELEASE_KEY_PASSWORD=MitraisCDC
```

These are going to be global gradle variables, which we can later use in our gradle config to sign our app.

Note about saving the keystore:
Once you publish the app on the Play Store, you will need to republish your app under a different package name (losing all downloads and ratings) if you want to change the signing key at any point. So backup your keystore and don't forget the passwords.
Note about security: If you are not keen on storing your passwords in plaintext and you are running OSX, you can also store your credentials in the Keychain Access app. Then you can skip the two last rows in `~/.gradle/gradle.properties`.

Adding signing config to your app's gradle config 
Edit the file `android/app/build.gradle` in your project folder and add the signing config,

```
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('OSC_RELEASE_STORE_FILE')) {
                storeFile file(OSC_RELEASE_STORE_FILE)
                storePassword OSC_RELEASE_STORE_PASSWORD
                keyAlias OSC_RELEASE_KEY_ALIAS
                keyPassword OSC_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

Generating the release APK 
Simply run the following in a terminal:

`$ cd android && ./gradlew assembleRelease`
Gradle's assembleRelease will bundle all the JavaScript needed to run your app into the APK. If you need to change the way the JavaScript bundle and/or drawable resources are bundled (e.g. if you changed the default file/folder names or the general structure of the project), have a look at android/app/build.gradle to see how you can update it to reflect these changes.

The generated APK can be found under `android/app/build/outputs/apk/app-release.apk`, and is ready to be distributed.


## Testing the release build of your app 

Before uploading the release build to the Play Store, make sure you test it thoroughly. First uninstall any previous version of the app you already have installed. Install it on the device using:

```
$ react-native run-android --variant=release
```

Note that `--variant=release` is only available if you've set up signing as described above.

You can kill any running packager instances, all your framework and JavaScript code is bundled in the APK's assets.

## Enabling Proguard to reduce the size of the APK (optional) 
Proguard is a tool that can slightly reduce the size of the APK. It does this by stripping parts of the React Native Java bytecode (and its dependencies) that your app is not using.

IMPORTANT: Make sure to thoroughly test your app if you've enabled Proguard. Proguard often requires configuration specific to each native library you're using. See app/proguard-rules.pro.

To enable Proguard, edit `android/app/build.gradle`:

```
/**
 * Run Proguard to shrink the Java bytecode in release builds.
 */
def enableProguardInReleaseBuilds = true
```