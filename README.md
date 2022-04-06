# Tenzies
A fun dice game. Maintains user high score. Winning confetti animation.

**Link to project:** https://gk-tenzies.netlify.app

<img width="100%" alt="tenzies" src="https://user-images.githubusercontent.com/92345400/162073258-c4a5bcb2-b673-487f-ab33-c319da3e718c.png">

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, React

High score including rolls and time are maintained with local storage. Die images rendered with CSS and flexbox via a dot generator function in a reusable Die component. useEffect hooks handle held dice, interval which continuously checks for "tenzies", and local storage updates whenever associated variables are updated. Imported package [react-confetti](https://github.com/alampros/react-confetti.git) for winning animation.

