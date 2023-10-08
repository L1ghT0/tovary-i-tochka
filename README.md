## PSD to HTML code.
Responsive web design with mobile and desktop 1024 / 1400px versions

This project was written using only:

- HTMl
- CSS
- Native JavaScript 

### features:

- Responsive web design
- JavaScript animations
- Automatically repositioning hover-elements
- Form validator


### Available on gh-pages:

https://l1ght0.github.io/tovary-i-tochka/

#

initialData: all the data used has been taken from psd-template
and has been placed in the 'initialData.js' file.

### Screenshorts:

![tovaryITochka](/screenshots/tovaryITochka.png)

#

![tovaryITochkaCollapsed](/screenshots/tovaryITochkaCollaped.png)


### Huge recent changes:

1. The project structure:

Lately I have changed the whole structure of this project. 
The reason I did that is because it started to grow and I 
ran into an interesting issue that could have happened.

Before talking about the issue I want to show the previous structure:

![OldAppsStructure](/screenshots/AppsStructure.png)

The idea of this structure was dividing files not by 
components but by its actions such as: "animations", "hover", "checkboxes" 
and rename (which I didn't do on screenshot) files to component's name it belongs.
So follow that idea if you want to find something you'd go like: 
'./src/js/action/component.js

The issue:\
Even though the structure wasn't finished yet, I realized that 
directories: "modals", "counter", "form" aren't actions and because 
of that I couldn't completely follow my idea. It wasn't a 
big problem for such small application but a huge problem for
an application that would grow. Another problem: I needed to 
add another action named "remove". There is a lot of trash-bins that 
didn't work and I had to fix that. Ok! imagine I did that. Let's take a look:

![removeFolderExample](/screenshots/removeFolder_Example.png)

Next time you need to find the logic of removing something in
modals where would you look for it? Would you go 
'./src/js/modals' or './src/js/remove' ? It's confusing, isn't it?

These 2 reasons make me think twice about the whole
structure and how it'd go.
