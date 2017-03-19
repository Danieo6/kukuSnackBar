# kukuSnackBar
is a lightweight easily customizable and responsive SnackBar made in JavaScript with some help of HTML and CSS.
**kukuSnackBar** provides you a simple system for customizing and controlling your SnackBar (more below).

### [DEMO AVAIBLE HERE](https://danieo74.github.io/kukuSnackBar/demo)
## How to use?
First you have to include the kukuSnackBar code and create to your website:
```html
<script src="kukusnackbar.js"></script>
```
then you have to create an instance of **kukuSnackBar**
```javascript
var kuku = new kukuSnackbar([defaultStyle]);
```
You can use the optional *defaultStyle* parameter to change the default look of the snackbar (if you don't know how a kukuSnackBar style should look go to the Style section).
To show the SnackBar you simply call the *show([text], [options])* function.
```javascript
kuku.show('My snackbar text', {autohide:true, time:3});
```
*text* and *options* are optional parameters.
*text* - is the text displayed in the snackbar (it can be also HTML). If yu don't provide it kukuSnackBar will use the latest used text or it's default text.
*options* - tell how the snackbar should behave after showing. Options look like these:
```
{
autohide:true,//Should the SnackBar hide automatically? (Default: false)
time:2,//The time (in seconds) after which the snackbar will be hided automatically (autohide have to be set to true. Default: 2)
button:'Dismiss',//The text displayed in the snackbar button (Default: Dismiss)
click: function(){},//The function called after clicking the button (Default: it's used for manual hiding the snackbar)
}
```
You needn't to set all options. If you don't pass one of these **kukuSnackBar** will use it's default state.
To hide the snackbar simply call *hide()*
```javascript
kuku.hide();
```

##Styles

**kukuSnackBar** has some default styles defined for different types of alerts.
* primary - used for anything
* success - used when a action is succeed
* info - used for informing the user about something
* warning - used to display warnings
* danger - used to display something important, like critical error
You can change the style of the snackbar by calling *changeStyle(style)*. Remember to call *changeStyle(style)* before calling *show([text], [options])*!
```javascript
kuku.changeStyle('warning');
```
Use *addStyle(name, style)* to add your custom styles.
```javascript
kuku.addStyle('mystyle', {background:'#FF0000', color: '#FFFFFF'});
```
All styles in **kukuSnackBar** should look this way:
```
styleName:{
  background: '#212121', //Color of the snackbar
  color: '#F5F5F5', //Color of the text in the snackbar
  buttonColor: '#00897B', //Color of the button in the snackbar
  font: 'NotoSans', //Font used for the snackbar
  verticalPadding: '10px', //Left and right padding for the content in the snackbar
  animation: {name: 'default', duration: '1s'}, //Default animation for the snackbar.
}
```
You needn't to pass all of the properties. If you don't pass any of these **kukuSnackBar** will automatically inherit the missing property from it's default style.

##Transform

**kukuSnackBar** can be transformed with the *move(x, y)* and *resize(w, h)* functions.
```javascript
kuku.move('50%', '37px');
```
Is used to move the snackbar around the browser window. X is for the horizontal axis position and Y is for the vertical axis position.

```javascript
kuku.resize('200px', '5em');
```
Is used to resize the snackbar. W is the snackbar width and H is the height.
