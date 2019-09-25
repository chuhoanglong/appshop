# react-native-my-library

## Getting started

`$ npm install react-native-my-library --save`

### Mostly automatic installation

`$ react-native link react-native-my-library`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-my-library` and add `MyLibrary.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libMyLibrary.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`
  - Add `import com.reactlibrary.MyLibraryPackage;` to the imports at the top of the file
  - Add `new MyLibraryPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-my-library'
  	project(':react-native-my-library').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-my-library/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-my-library')
  	```


## Usage
```javascript
import MyLibrary from 'react-native-my-library';

// TODO: What to do with the module?
MyLibrary;
```
