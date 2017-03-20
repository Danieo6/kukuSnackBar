/*
Project: kukuSnackBar
Author: Daniel 'Danieo' Budziński
Version: 01.00.00
License: Apache 2.0
Github: https://github.com/Danieo74/kukuSnackBar
*/
function kukuSnackbar(defaultStyle)
{
    'use strict';

    //SnackBar styles
    var style = {
        default: {
            background: '#212121',
            color: '#F5F5F5',
            buttonColor: '#00897B',
            font: 'NotoSans',
            verticalPadding: '10px',
            animation: {name: 'default', duration: '1s'},
        },

        primary: {
            background: '#3F51B5',
            buttonColor: '#F5F5F5',
        },

        success: {
            background: '#4CAF50',
            buttonColor: '#F5F5F5',
        },

        info: {
            background: '#2196F3',
            buttonColor: '#F5F5F5',
        },

        warning: {
            background: '#FFC107',
            buttonColor: '#F5F5F5',
        },

        danger: {
            background: '#DD2C00',
            buttonColor: '#F5F5F5',
        },
    };

    //SnackBar animations
    var animation = "@keyframes snackbar-anim-default{ from{ bottom: -10%; opacity: 0; } to{ bottom: 0; opacity: 1; } } @keyframes snackbar-anim-back-default{ from{ bottom: 0; } to{ bottom: -10%; } } .snackbar-anim{ animation-name: snackbar-anim-animname; animation-duration: animduration; animation-direction: normal; animation-fill-mode: forwards;} .snackbar-anim-back{ animation-name: snackbar-anim-back-animname; animation-duration: animduration; animation-direction: normal; animation-fill-mode: forwards;}";

    //Main SnackBar variables
    var snackbar;
    var snackbarText = 'Hello, I\'m a SnackBar! You can change this text by providing me the text i should display.';
    var snackbarStyle = style['default'];;

    //Initialize SnackBar (called automatically)
    function Init()
    {
        //Create the SnackBar element
        snackbar = document.createElement('div');
        snackbar.id = 'snackbar';

        if(is(defaultStyle))
        {
            //Load default style
            ChangeStyle(defaultStyle);
        }

        //Position and resize the SnackBar rect
        snackbar.style.position = 'fixed';
        Resize('100%', '10%');
        Move(0, '-'+snackbar.style.height);
        RefreshAnim();

        //Style it
        snackbar.style.background = snackbarStyle.background;
        snackbar.style.color = snackbarStyle.color;
        snackbar.style.fontFamily = snackbarStyle.font;

        //Add the SnackBar to the body
        document.body.appendChild(snackbar);

        //Add listeners
        window.addEventListener('resize', function(){
            Resize(transform.size.width, transform.size.height); 
            Move(transform.position.x, transform.position.y);
        });
    }

    //Move the SnackBar
    function Move(x, y)
    {
        snackbar.style.left = x;
        snackbar.style.bottom = y;
    }

    //Resize the SnackBar
    function Resize(w, h)
    {
        snackbar.style.width = w;
        snackbar.style.height = h;
    }

    //Refresh the SnackBar
    function RefreshAnim()
    {
        animation = animation.replace(/animname/g, snackbarStyle.animation.name);
        animation = animation.replace(/animduration/g, snackbarStyle.animation.duration);

        var animStyle;
        if(document.getElementById('snackbar-anim-style') == null)
        {
            animStyle = document.createElement('style');
            animStyle.id = 'snackbar-anim-style';
            animStyle.innerHTML = animation;
            document.body.appendChild(animStyle);
        }
        else
        {
            animStyle = document.getElementById('snackbar-anim-style');
            animStyle.innerHTML = animation;
        }

    }

    //Function tha allow changing the SnackBar style
    function ChangeStyle(style)
    {
        if(is(style.background))
            snackbarStyle.background = style.background;

        if(is(style.color))
            snackbarStyle.color = style.color;
                
        if(is(style.buttonColor))
            snackbarStyle.buttonColor = style.buttonColor;

        if(is(style.font))
            snackbarStyle.font = style.font;
            
        if(is(style.verticalPadding))
            snackbarStyle.verticalPadding = style.verticalPadding;
                
        if(is(style.animation))
            snackbarStyle.animation = style.animation;
        
        snackbar.style.background = snackbarStyle.background;
        snackbar.style.color = snackbarStyle.color;
        snackbar.style.fontFamily = snackbarStyle.font;
    }

    //Internal use function
    function is(variable)
    {
        if(typeof variable === 'undefined' )
            return false;
        else   
            return true;
    }

    //Functions that are public
    var callable = {
        show: function(text, o)
        {
            var button;

            var options = {
                autohide: false,
                time: 2,
                button: 'Dismiss',
                click: function(){callable.hide();},
            };

            if(is(text))
                snackbarText = text;

            if(is(o))
            {
                if(is(o.autohide))
                {
                    if(o.autohide == true)
                    {
                        if(o.time > 0)
                            setTimeout(function(){callable.hide();}, o.time*1000);
                        else
                            setTimeout(function(){callable.hide();}, Math.abs(o.time));
                    }
                }

                if(is(o.button))
                    options.button = o.button;
                
                if(is(o.click))
                    options.click = o.click;
            }
            
            button = '<a id="snackbar-button" style="display: table-cell; vertical-align: middle; width: 10%; text-align: right; text-decoration: none; color: '+snackbarStyle.buttonColor+'; padding-right: '+snackbarStyle.verticalPadding+'; font-weight: bold;" href="#">'+options.button+'</a>';            
            snackbar.innerHTML = '<div style="display: table; width: 100%; height: 100%;"><p style="display: table-cell; vertical-align: middle; width: 90%; padding-left: '+snackbarStyle.verticalPadding+';">'+snackbarText+'</p>'+button+'</div>';
            document.getElementById("snackbar-button").addEventListener('click', options.click);   

            snackbar.classList.remove('snackbar-anim-back');
            snackbar.className = 'snackbar-anim'; 
        },

        hide: function()
        {   
            if(snackbar.getBoundingClientRect().bottom <= window.innerHeight)
            {
                if(snackbar.getBoundingClientRect().left >= 0)
                {
                snackbar.classList.remove('snackbar-anim');
                snackbar.className = 'snackbar-anim-back';
                }
            }
        },

        move: function(x, y){ Move(x, y); },

        resize: function(w, h){ Resize(w, h); },

        changeStyle: function(name){ ChangeStyle(style[name]);},

        addStyle: function(name, s)
        {
            if(!is(s.background))
                s.background = style['default'].background;

            if(!is(s.color))
                s.color = style['default'].color;
                    
            if(!is(s.buttonColor))
                s.buttonColor = style['default'].buttonColor;

            if(!is(s.font))
                s.font = style['default'].font;
                
            if(!is(s.verticalPadding))
                s.verticalPadding = style['default'].verticalPadding;
                    
            if(!is(s.animation))
                s.animation =style['default'].animation;
            
            style[name] = s;
        },

        addAnimation: function(css){animation += css; RefreshAnim();}
    }

    Init();
    return callable;
}