### Running the project!

Since the project uses 3 native library, which are:

1. [react-native-bluetooth-serial](https://github.com/rusel1989/react-native-bluetooth-serial)
2. [react-native-audio-record](https://github.com/goodatlas/react-native-audio-record)
3. [react-native-svg](https://github.com/react-native-community/react-native-svg)

**Installing all the dependencies of project**

```shell
yarn install
```

### So lets talk about the error that you might see in project

After installing all the dependencies of the project you will start try to run the project, running command for the project is:

```shell
yarn android
```

This might show alot of error so here are the things that you have todo! 
Folow this instructions carefully so that you won't see any errors.


Go to `node_modules/react-native-bluetooth-serial/android/src/main/java/com/rusel/RCTBluetoothSerial/RCTBluetoothSerialPackage.java` file and take out the `@Override` from the line number `23`. 
This is due to React Native version after 0.60 doesn't have the implemented method `createJSModules()` for details about this error look [issue in GitHub](https://github.com/rusel1989/react-native-bluetooth-serial/issues/55)


Most of the time you'll be seeing this problem again and again.


There is another issue which will come when you try to install the project second time on your device, and this error will probably going to be: `> Task :react-native-bluetooth-serial:generateDebugBuildConfig FAILED`. 
So if you're seeing this error then it says to delete a file from the directory so please take a closer look into your `console` before searching the problem on the internet and delete the directory from your system.


This is the most occuring problem that is seen in our Application installation.