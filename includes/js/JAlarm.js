//
//  JAlarm.h
//
// Created by Wei Ru Guo on 11/05/2011
// Copyright 2012 Home Fellas. All rights reserved.

var cordovaRef = window.PhoneGap || window.Cordova || window.cordova; // old to new fallbacks

function JAlarm() {}
	JAlarm.prototype.create = function() {
};



/*
 @DESCRIPTION
        register Alarm with it's information
 @PARAMETER (alarmInfo)
    javascript dictionary
         'datetime'             : int       (timestamp reference from 1970-1-1 00:00:00)
         'enable_sound'         : int       (0/1)
         'title'                : string
         'message'              : string
         'notification_style'   : int       (0/1)
         'snooze_option'        : int       (0/1)
         'snooze_time'          : int       (seconds)
         'repeat_option'        : int       (0/1)
 
 */
JAlarm.prototype.registerAlarm = function(callback_js, alarmInfo)
{
    var that = window.plugins.jAlarm;
    var key = "register";
    
    window.plugins.jAlarm.callBacks = callback_js;
    window.plugins.jAlarm.callbackMap[key] = {
        success: function(result)
        {
            //process alarmID
			window.plugins.jAlarm.callBacks.success();
            delete that.callbackMap[key];
        },
        fail: function() {
            //show unknow error
			window.plugins.jAlarm.callBacks.fail();
            delete that.callbackMap[key];
        }
    };
    
    var callback = 'window.plugins.jAlarm.callbackMap.' + key;
    cordovaRef.exec(null, null, 'JAlarm', 'registerAlarm',
                    [callback + '.success',
                     callback + '.fail',
                     alarmInfo['datetime'],
                     alarmInfo['enable_sound'],
                     alarmInfo['title'],
                     alarmInfo['message'],
                     alarmInfo['notification_style'],
                     alarmInfo['snooze_option'],
                     alarmInfo['snooze_time'],
                     alarmInfo['repeat_option']]);
};

/* 
 @DESCRIPTION
        remove alarm with it's ID
 
 */
JAlarm.prototype.removeAlarm = function(callback_js, alarmId)
{
    var that = window.plugins.jAlarm;
    var key = "remove";
    window.plugins.jAlarm.callBacks = callback_js;
    window.plugins.jAlarm.callbackMap[key] = {
        success: function(result)
        {
            //refresh list
			window.plugins.jAlarm.callBacks.success(result);
            delete that.callbackMap[key];
        },
        fail: function() {
            //show unknow error
			window.plugins.jAlarm.callBacks.fail();
            delete that.callbackMap[key];
        }
    };
    
    var callback = 'window.plugins.jAlarm.callbackMap.' + key;
    cordovaRef.exec(null, null, 'JAlarm', 'removeAlarm', [callback + '.success',callback + '.fail',alarmId]);
};

/*
 @DESCRIPTION
        list all alarms
 @RETURN VALUE
    array of alarm informations
    alarm informations are represented by dictionary as javascript following:
         'id'                   : int
         'datetime'             : int       (timestamp reference from 1970-1-1 00:00:00)
         'enable_sound'         : int       (0/1)
         'title'                : string
         'message'              : string
         'notification_style'   : int       (0/1)
         'snooze_option'        : int       (0/1)
         'snooze_time'          : int       (seconds)
         'repeat_option'        : int       (0/1)
 
 */
JAlarm.prototype.listAllAlarms = function(callback_js)
{
    var that = window.plugins.jAlarm;
    var key = "list";
    
    window.plugins.jAlarm.callBacks = callback_js;
    window.plugins.jAlarm.callbackMap[key] = {
        success: function(result)
        {
             window.plugins.jAlarm.callBacks.success(result);
            delete that.callbackMap[key];

        },
        fail: function() {
            //show unknow error
			 window.plugins.jAlarm.callBacks.fail();
            delete that.callbackMap[key];
        }
    };
    
    var callback = 'window.plugins.jAlarm.callbackMap.' + key;
    cordovaRef.exec(null, null, 'JAlarm', 'listAllAlarms', [callback + '.success',callback + '.fail']);
};

JAlarm.prototype.callBacks = {};
JAlarm.prototype.callbackMap = {};
JAlarm.prototype.refreshCallback = null;

cordova.addConstructor(function() {
	if(!window.plugins) window.plugins = {};
	window.plugins.jAlarm = new JAlarm();
});
