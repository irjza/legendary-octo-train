# Deployment Guide

This document provides instructions for deploying Shoutdle to various platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Web Deployment](#web-deployment)
- [iOS Deployment](#ios-deployment)
- [Android Deployment](#android-deployment)
- [Environment Configuration](#environment-configuration)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- Node.js 18 or higher installed
- npm or yarn package manager
- Expo CLI available via npx (no need to install globally)
- An Expo account (sign up at https://expo.dev)
- Git for version control

### Platform-Specific Prerequisites

**For iOS:**
- macOS computer
- Xcode installed (latest version recommended)
- Apple Developer account (for App Store deployment)

**For Android:**
- Android Studio installed
- Android SDK configured
- Google Play Developer account (for Play Store deployment)

**For Web:**
- Web hosting service (e.g., Netlify, Vercel, GitHub Pages)
- Domain name (optional)

## Web Deployment

### Static Hosting (Netlify, Vercel, GitHub Pages)

1. **Build the web app:**
   ```bash
   npx expo export:web
   ```

2. **Deploy the `web-build` directory to your hosting provider**

#### Netlify Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=web-build
```

#### Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod web-build
```

#### GitHub Pages

1. **Add to `package.json`:**
   ```json
   {
     "homepage": "https://yourusername.github.io/legendary-octo-train",
     "scripts": {
       "predeploy": "npx expo export:web",
       "deploy": "gh-pages -d web-build"
     }
   }
   ```

2. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

### Web Configuration

For proper microphone access, ensure your site uses HTTPS. Most hosting providers automatically provide SSL certificates.

**Browser Compatibility:**
- Chrome (recommended)
- Edge
- Safari (with limitations)
- Firefox (limited speech recognition support)

## iOS Deployment

### Development Build

1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Install Expo Go app on your iOS device**

3. **Scan the QR code** displayed in the terminal

### Production Build

#### Using EAS Build (Recommended)

1. **Install EAS CLI:**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo:**
   ```bash
   eas login
   ```

3. **Configure EAS:**
   ```bash
   eas build:configure
   ```

4. **Build for iOS:**
   ```bash
   eas build --platform ios
   ```

5. **Submit to App Store:**
   ```bash
   eas submit --platform ios
   ```

#### Local Build (Alternative)

1. **Generate iOS project:**
   ```bash
   npx expo prebuild --platform ios
   ```

2. **Open in Xcode:**
   ```bash
   open ios/Shoutdle.xcworkspace
   ```

3. **Configure signing & capabilities in Xcode**

4. **Build and archive** using Xcode

### iOS Configuration

**Ensure permissions are set in app.json:**
```json
{
  "ios": {
    "infoPlist": {
      "NSMicrophoneUsageDescription": "This app needs access to the microphone to recognize spoken words for the game.",
      "NSSpeechRecognitionUsageDescription": "This app needs speech recognition to understand the words you say."
    }
  }
}
```

## Android Deployment

### Development Build

1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Install Expo Go app on your Android device**

3. **Scan the QR code** or connect via USB

### Production Build

#### Using EAS Build (Recommended)

1. **Install EAS CLI:**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo:**
   ```bash
   eas login
   ```

3. **Configure EAS:**
   ```bash
   eas build:configure
   ```

4. **Build for Android:**
   ```bash
   eas build --platform android
   ```

5. **Submit to Play Store:**
   ```bash
   eas submit --platform android
   ```

#### Local Build (Alternative)

1. **Generate Android project:**
   ```bash
   npx expo prebuild --platform android
   ```

2. **Build APK/AAB:**
   ```bash
   cd android
   ./gradlew assembleRelease
   # or for bundle
   ./gradlew bundleRelease
   ```

3. **Output files:**
   - APK: `android/app/build/outputs/apk/release/app-release.apk`
   - AAB: `android/app/build/outputs/bundle/release/app-release.aab`

### Android Configuration

**Ensure permissions are set in app.json:**
```json
{
  "android": {
    "permissions": [
      "android.permission.RECORD_AUDIO"
    ]
  }
}
```

## Environment Configuration

### Development

Create a `.env` file for environment-specific configuration:

```env
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_ENV=development
```

### Production

Set environment variables in your build configuration:

**EAS Build (eas.json):**
```json
{
  "build": {
    "production": {
      "env": {
        "EXPO_PUBLIC_ENV": "production"
      }
    }
  }
}
```

## Build Optimization

### Reducing Bundle Size

1. **Enable tree shaking** (automatically done by Metro)

2. **Remove console logs in production:**
   ```javascript
   // babel.config.js
   module.exports = function(api) {
     api.cache(true);
     return {
       presets: ['babel-preset-expo'],
       plugins: [
         ['transform-remove-console', {
           exclude: ['error', 'warn']
         }]
       ]
     };
   };
   ```

3. **Optimize images** in the assets folder

### Performance Optimization

1. **Enable Hermes engine** (already enabled by default in Expo)

2. **Use production builds** for testing performance

3. **Profile the app** using React DevTools

## Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npx expo export:web
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=web-build
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Monitoring and Analytics

Consider adding analytics to track usage:

1. **Google Analytics** for web
2. **Firebase Analytics** for mobile apps
3. **Sentry** for error tracking

## Troubleshooting

### Common Issues

**Build Fails:**
- Clear cache: `npx expo start -c`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Update Expo SDK: `npx expo upgrade`

**iOS Simulator Issues:**
- Reset simulator: `xcrun simctl erase all`
- Rebuild: `npx expo run:ios`

**Android Build Issues:**
- Clean build: `cd android && ./gradlew clean`
- Check Java version: `java -version` (use Java 11 or 17)

**Speech Recognition Not Working:**
- Verify permissions in app.json
- Check device settings for microphone access
- Test on physical device (simulators may have limited support)

**Web Deployment HTTPS Issues:**
- Ensure hosting provider has SSL certificate
- Use HTTPS for all resources
- Check browser console for mixed content warnings

### Getting Help

If you encounter issues:
1. Check the [Expo documentation](https://docs.expo.dev)
2. Search [Expo forums](https://forums.expo.dev)
3. Open an issue on the repository
4. Check the [troubleshooting guide](https://docs.expo.dev/troubleshooting/)

## Post-Deployment Checklist

- [ ] App loads correctly on all target platforms
- [ ] Microphone permissions work properly
- [ ] Voice recognition functions as expected
- [ ] Audio feedback plays correctly
- [ ] Game logic works without errors
- [ ] UI renders properly on different screen sizes
- [ ] Performance is acceptable (no lag or freezing)
- [ ] All links and buttons work
- [ ] Analytics are tracking correctly (if implemented)
- [ ] Error tracking is configured
- [ ] App store metadata is complete (icons, screenshots, descriptions)
- [ ] Privacy policy and terms of service are accessible
- [ ] Contact information is available for user support

## Maintenance

Regular maintenance tasks:

1. **Update dependencies monthly:**
   ```bash
   npm update
   npx expo upgrade
   ```

2. **Monitor error logs** via Sentry or similar service

3. **Review user feedback** from app stores

4. **Test on new OS versions** when released

5. **Keep documentation updated** with changes

6. **Backup configuration** and environment variables

## Security Considerations

- Never commit API keys or secrets to version control
- Use environment variables for sensitive configuration
- Keep dependencies up to date for security patches
- Enable two-factor authentication on deployment accounts
- Regularly review and update permissions
- Use HTTPS for all external communications
- Implement proper error handling to avoid exposing sensitive information
