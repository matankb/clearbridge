const messages = {
  bridgeHeader: String.raw`%c
   _____ _                  ____       _     _            
  / ____| |                |  _ \     (_)   | |           
 | |    | | ___  __ _ _ __ | |_) |_ __ _  __| | __ _  ___ 
 | |    | |/ _ \/ _  | |__||  _ <| '__| |/ _| |/ _| |/ _ \
 | |____| |  __/ (_| | |   | |_) | |  | | (_| | (_| |  __/
  \_____|_|\___|\__,_|_|   |____/|_|  |_|\__,_|\__, |\___|
                                               __/ |     
                                              |___/      
  `,
  initialMessage: `=============================
You've opened the console!
Know how to code? Interested in helping out?
Call getInTouch with the global object to continue.
=============================`,
  successMessage: `
Awesome! Email 205matan@gmail.com for more information.
Don't worry, this doesn't commit you to anything. Thanks!
`,
};

function showBanner() {
  /* eslint-disable no-console */

  console.log(messages.bridgeHeader, 'color: #00796b');
  console.log(messages.initialMessage);

  global.getInTouch = function(g) {
    if (g === global) {
      console.log(messages.successMessage);
    }
  };

  global.getInTouch.toString = () => 'No peeking :)';

  /* eslint-enable no-console */
}

if (process.env.NODE_ENV === 'production') {
  showBanner();
}
