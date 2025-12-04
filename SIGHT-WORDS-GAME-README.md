# 🌟 Sight Words Learning Game

A touchscreen-friendly, single-page browser game designed for a 4.10-year-old autistic child to learn sight words through interactive teaching and practice modes.

## 🎯 Features

- **Teaching Mode**: Shows sentences with highlighted sight words, spoken in Indian English (female voice)
- **Practice Mode**: Interactive questions with large, tappable answer buttons
- **Progress Tracking**: Saves progress in browser's local storage
- **Full-screen Support**: Perfect for Samsung tablets
- **Accessibility**: Screen reader support, high contrast, large text
- **Celebration Effects**: Confetti animations and sounds for correct answers
- **Offline Capable**: Works without internet (if assets are local)

## 🚀 Quick Start

### 1. Open the Game
Simply open `sight-words-game.html` in Chrome on your Samsung tablet.

### 2. Enable Full Screen
Tap the **⛶** button in the top-right corner to enter full-screen mode for distraction-free learning.

### 3. Enable Sound
Tap anywhere on the screen to activate audio (required by browsers).

### 4. Start Learning!
- **📚 Teaching**: Learn new sight words with pictures and sentences
- **✏️ Practice**: Answer questions to test understanding
- **📊 Progress**: View learning statistics

## 📷 Included Assets

The game comes with simple SVG placeholder images that work immediately! These are already included:

```
📁 Your folder
  ├── sight-words-game.html
  ├── boy_playing.svg       ✅ (simple boy playing illustration)
  ├── bottle.svg           ✅ (bottle on a table)
  ├── cat.svg              ✅ (cat in a box)
  ├── ball.svg             ✅ (red ball)
  ├── boy_happy.svg        ✅ (happy boy with arms up)
  └── apple.svg            ✅ (red apple)
```

**The game works right out of the box!** Open `sight-words-game.html` and start playing immediately.

### Want Better Images?

You can replace the SVG files with your own high-quality photos or illustrations:

- **Size**: 800x600 pixels or larger
- **Format**: PNG, JPG, SVG, or WEBP
- **Content**: Clear, simple, high-contrast images
- **Style**: Child-friendly, colorful photos or illustrations
- **Names**: Keep the same filenames (e.g., replace `boy_playing.svg` with `boy_playing.png`)

### Optional Audio Files
The game generates sounds using Web Audio API, but you can add custom sounds:
- `celebration.mp3` - Played when answer is correct
- `try-again.mp3` - Played when answer is wrong

## 🎨 Customization

### Adding More Sight Words

Open `sight-words-game.html` in a text editor and find the `gameData` object (around line 600):

```javascript
const gameData = {
    sightWords: ['is', 'it', 'in', 'on', 'am', 'an'], // Add more words here!

    lessons: [
        // Add more lessons here following the same pattern
        {
            sightWord: 'your_word',
            image: 'your_image.png',
            imageAlt: 'Description of image',
            sentence: 'The sentence with your_word highlighted.',
            question: 'What is the question?',
            correctAnswer: 'your_word',
            options: ['your_word', 'other', 'options']
        }
    ]
};
```

### Changing Colors

Find the `<style>` section in the HTML file and modify these CSS variables:

```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Highlight color for sight words */
.sight-word {
    color: #e91e63;  /* Change this color */
}
```

### Adjusting Text Size

Modify the `clamp()` values in CSS:

```css
.sentence-text {
    font-size: clamp(32px, 6vw, 56px);  /* min, preferred, max */
}
```

## 🔧 Troubleshooting

### No Voice / Silent Mode
- **Problem**: Text-to-speech not working
- **Solution**: Tap anywhere on the screen to enable audio, check that the 🔊 button is not showing 🔇

### Images Not Showing
- **Problem**: Placeholder text appears instead of images
- **Solution**: Ensure image files are in the same folder and names match exactly (case-sensitive)

### Fullscreen Not Working
- **Problem**: Fullscreen button doesn't work
- **Solution**: This feature requires user interaction and may not work on all browsers. Try Chrome or Safari.

### Wrong Voice Language
- **Problem**: Voice speaks in wrong accent
- **Solution**: The game tries to use Indian English female voices. If unavailable, it falls back to standard English. You may need to download additional voices in your device settings.

## 📱 Tested On

- ✅ Chrome (Android)
- ✅ Safari (iOS)
- ✅ Samsung Internet
- ✅ Firefox (Android)

## 🎓 Educational Goals

This game helps children learn:
- **Sight word recognition**: `is`, `it`, `in`, `on`, `am`, `an`
- **Reading comprehension**: Understanding sentences and questions
- **Visual association**: Connecting words with images
- **Audio-visual learning**: Hearing and seeing words simultaneously

## 📊 Progress Tracking

The game automatically saves:
- Total questions attempted
- Correct answers
- Per-word statistics
- Session progress

Data is stored in browser's `localStorage` and persists between sessions. Use the "Clear Progress" button in the Progress tab to reset.

## 🎁 Tips for Best Results

1. **Start with Teaching Mode**: Let the child hear and see each word multiple times
2. **Repeat Often**: Children learn through repetition - it's okay to go through the same lesson many times
3. **Praise Effort**: The game celebrates correct answers, but all attempts are learning opportunities
4. **Take Breaks**: Keep sessions short (10-15 minutes) for young learners
5. **Be Patient**: Learning happens at different paces for every child

## 💡 Technical Details

- **Single File**: Everything is embedded in one HTML file
- **No Dependencies**: No external libraries or frameworks
- **Offline Ready**: Works without internet (except for voices, which may need to be downloaded once)
- **Responsive**: Adapts to both portrait and landscape orientations
- **Lightweight**: ~40KB uncompressed

## 🐛 Known Limitations

- Indian English voices may not be available on all devices
- Some older browsers may not support all features
- Fullscreen mode requires user interaction
- Audio must be enabled by tapping the screen first (browser security requirement)

## 📄 License

Free to use, modify, and distribute for personal and educational purposes.

## 💬 Support

For issues or questions about the game, check the browser console (F12) for error messages.

---

**Made with ❤️ for Jammy's learning journey!**

*Version 1.0 - December 2025*
