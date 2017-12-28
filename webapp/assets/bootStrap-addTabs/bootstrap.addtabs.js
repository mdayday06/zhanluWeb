/**
 * Website: http://git.oschina.net/hbbcs/bootStrap-addTabs
 *
 * Version : 2.0
 *
 * Created by joe on 2016-2-4.Update 2017-03-14
 */
(function($) {
    var settings = {
        content: '', //直接指定所有页面TABS内容
        close: true, //是否可以关闭
        monitor: 'body', //监视的区域
        iframe: true, //使用iframe还是ajax
        iframeHeight: document.documentElement.clientHeight, //固定TAB中IFRAME高度,根据需要自己修改
        target: '.nav-tabs',
        contextmenu: true, //是否使用右键菜单
        local: {
            'refreshLabel': '刷新',
            'closeThisLabel': '关闭',
            'closeOtherLabel': '关闭其他',
            'closeLeftLabel': '关闭左侧',
            'closeRightLabel': '关闭右侧',
            'closeAllLabel':'全部关闭'
        },
        callback: function() { //关闭后回调函数
        }
    };
    var target;
    var tabs=[];
    var closetag=false;
    _click = function(obj) {
        var a_obj, a_target;
        a_obj = (typeof obj.data('addtab') == 'object') ? obj.data('addtab') : obj.data();
        if (!a_obj.id && !a_obj.addtab) {
            a_obj.id = Math.random().toString(36).substring(3, 35);
            obj.data('id', a_obj.id);
        }
        /*
        if(window.localStorage){
        	alert('support');
        	localStorage.setItem("test","test111");
        	alert('supporttest:'+localStorage.getItem("test"));
        	}else{
        		alert('unsupport');
        		}
        
        $.ajax({
        	url:a_obj.url+':8080/account/login',
        	type:'POST',
        	data:JSON.stringify({"name":"admin","password":"passw0rd"}),
        	contentType:'application/json;charset=utf-8',
        	dataType:'json',         	
        	success:function(response){
        		alert('success');
        		alert('test:'+ response.code);
        		alert('test:'+ response.data.Auth_token);
        		//localStorage.setItem("test1","test22222");
        		localStorage.setItem("Auth_token", response.data.Auth_token);
        		alert('Auth_token:'+localStorage.getItem('Auth_token'));
        		},
        	error:function(textStatus,errorThrown){
        		alert('errortextStatus:'+textStatus);
        		alert('errorerrorThrown:'+errorThrown);
        		}
        	});
        	*/
        $.addtabs.add({
            'target': a_obj.target ? a_obj.target : target,
            'id': a_obj.id ? a_obj.id : a_obj.addtab,
            'title': a_obj.title ? a_obj.title : obj.html(),
            'content': settings.content ? settings.content : a_obj.content,
            'url': a_obj.url,
            'ajax': a_obj.ajax ? true : false,
            'active':true
        });
    };
    _createMenu = function(right, icon, text) {
        return $('<a>', {
            'href': 'javascript:void(0);',
            'class': "list-group-item",
            'data-right': right
        }).append($('<i>', {
            'class': 'glyphicon ' + icon
        })).append(text);
    }
    _pop = function(id, e, mouse) {
        $('body').find('#popMenu').remove();
        var isstatic =e.attr('statictab')=='true'?true:false;
        var isfirstdynamic = e.prev('li').attr('statictab')=='true'?true:false;
        var islastdynamic = e.next('li').attr('id')?false:true;
        var refresh =  _createMenu('refresh', 'glyphicon-refresh', settings.local.refreshLabel);
        var remove = _createMenu('remove', 'glyphicon-remove', settings.local.closeThisLabel);
        //var left = _createMenu('remove-left', 'glyphicon-chevron-left', settings.local.closeLeftLabel);
        //var right = _createMenu('remove-right', 'glyphicon-chevron-right', settings.local.closeRightLabel);
        var closeall = _createMenu('remove-all', 'glyphicon-remove-circle', settings.local.closeAllLabel);
        var closeother=_createMenu('remove-circle', 'glyphicon-remove-circle', settings.local.closeOtherLabel);

        var popHtml = $('<ul>', {
            'aria-controls': id,
            'class': 'rightMenu list-group',
            id: 'popMenu',
            'aria-url': e.attr('aria-url'),
            'aria-ajax': e.attr('aria-ajax')
        });
        if(tabs.length > 0 && isstatic){
            popHtml;
        } else if(tabs.length > 0 && isfirstdynamic && islastdynamic){
            popHtml.append(refresh).append(remove);
        } else if(tabs.length > 0 && !isstatic){
            popHtml.append(refresh).append(remove).append(closeother).append(closeall);
        }
        popHtml.css({
            'top': mouse.pageY,
            'left': mouse.pageX
        });
        popHtml.appendTo($('body')).fadeIn('slow');
        //刷新页面
        $('ul.rightMenu a[data-right=refresh]').on('click', function() {
            var id = $(this).parent('ul').attr("aria-controls").substring(4);
            var url = $(this).parent('ul').attr('aria-url');
            var ajax = $(this).parent('ul').attr('aria-ajax');
            var tabtitle;
            for(var i= 0 ; i < tabs.length ; i++){
                if($.parseJSON(tabs[i])["id"] == id){
                    tabtitle=$.parseJSON(tabs[i])["title"];
                    break ;
                }
            }
            $.addtabs.add({
                'id': id,
                'url': url,
                'refresh': true,
                'ajax': ajax,
                'active':true,
                'title':tabtitle
            });
        });
        //关闭自身
        $('ul.rightMenu a[data-right=remove]').on('click', function() {
            var id = $(this).parent("ul").attr("aria-controls");
            if (id.substring(0, 4) != 'tab_') return;
            console.log("closecontext:"+id);
            closetag=true;
            _processArrayElem(id.substring(4),closetag);
            $.addtabs.close({
                "id": id
            });
            $.addtabs.drop();
        });
        //关闭其他
        $('ul.rightMenu a[data-right=remove-circle]').on('click', function() {
            var tab_id = $(this).parent('ul').attr("aria-controls");
            target.find('li').each(function() {
                var id = $(this).attr('id');
                var isstatic = $(this).attr('statictab');
                if (id && id != 'tab_' + tab_id && !isstatic) {
                    closetag=true;
                    _processArrayElem(id.substring(8),closetag);
                    $.addtabs.close({
                        "id": $(this).children('a').attr('aria-controls')
                    });
                }
            });
            $.addtabs.drop();
        });
        //全部关闭
        $('ul.rightMenu a[data-right=remove-all]').on('click', function() {
            var tab_id = $(this).parent('ul').attr("aria-controls");
            target.find('li').each(function() {
                var id = $(this).attr('id');
                var isstatic = $(this).attr('statictab');
                if (id && !isstatic) {
                    closetag=true;
                    _processArrayElem(id.substring(8),closetag);
                    $.addtabs.close({
                        "id": $(this).children('a').attr('aria-controls')
                    });
                }
            });
            $.addtabs.drop();
        });
        //关闭左侧
        $('ul.rightMenu a[data-right=remove-left]').on('click', function() {
            var tab_id = $(this).parent('ul').attr("aria-controls");
            $('#tab_' + tab_id).prevUntil().each(function() {
                var id = $(this).attr('id');
                var isstatic = $(this).attr('statictab');
                if (id && id != 'tab_' + tab_id && !isstatic) {
                    closetag=true;
                    _processArrayElem(id.substring(8),closetag);
                    $.addtabs.close({
                        "id": $(this).children('a').attr('aria-controls')
                    });
                }
            });
            $.addtabs.drop();
        });
        //关闭右侧
        $('ul.rightMenu a[data-right=remove-right]').on('click', function() {
            var tab_id = $(this).parent('ul').attr("aria-controls");
            var r;
            if (target.find('#tab_' + tab_id).length > 0) r = $('#tab_' + tab_id);
            else r = target.find('a[href=#' + tab_id + ']').parent('li');
            r.nextUntil().each(function() {
                var id = $(this).attr('id');
                if (id && id != 'tab_' + tab_id) {
                    closetag=true;
                    _processArrayElem(id.substring(8),closetag);
                    $.addtabs.close({
                        "id": $(this).children('a').attr('aria-controls')
                    });
                }
            });
            $.addtabs.drop();
        });
        popHtml.mouseleave(function() {
            $(this).fadeOut('slow');
        });
        $('body').click(function() {
            popHtml.fadeOut('slow');
        })
    };
    _listen = function() {
        $(settings.monitor).on('click', '[data-addtab]', function() {
            _click($(this));
            $.addtabs.drop();
        });
        $('body').on('click', '.close-tab', function() {
            var id = $(this).prev("a").attr("aria-controls");
            closetag=true;
            console.log('clsoetab:'+id + ':'+closetag);
            $.addtabs.close({
                'id': id
            });
            $.addtabs.drop();
        });
        $('body').on('click', "[id ^= 'tab_tab_']", function() {
            var id = $(this).attr("id").substr(8);
            _processArrayElem(id,closetag);
        });
        if (settings.contextmenu) {
            //obj上禁用右键菜单
            $('body').on('contextmenu', 'li[role=presentation]', function(e) {
                var id = $(this).children('a').attr('aria-controls');
                if(tabs.length >0 ){
                    _pop(id, $(this), e);
                }
                return false;
            });
        }
        var el;
        $('body').on('dragstart.h5s', '.nav-tabs li', function(e) {
            el = $(this);
        }).on('dragover.h5s dragenter.h5s drop.h5s', '.nav-tabs li', function(e) {
            if (el == $(this)) return;
            $('.dragBack').removeClass('dragBack');
            $(this).addClass('dragBack');
            el.insertAfter($(this))
        }).on('dragend.h5s', '.nav-tabs li', function() {
            $('.dragBack').removeClass('dragBack');
        });
    };
    _processArrayElem = function( tabid,closetagpar) {
        var tabindex = _findArrayElem(tabs,'id',tabid);
        if (tabindex > -1) {
            _inactiveArrayElem(tabs,'active',false,closetagpar);
            _activeArrayElem(tabs,tabindex,'active',true,closetagpar);
            if(closetagpar && tabindex > -1 ){
                if (tabindex > 0 ){
                    for (var i=0;i<tabs.length;i++) {
                        var itemarrayclose = $.parseJSON(tabs[i]);
                        if(itemarrayclose['active']==true){
                            $.addtabs.add($.parseJSON(tabs[i]));
                            break;
                        }
                    }
                }
                if(tabindex==0){
                    $.cookie("tabNodes",JSON.stringify(tabs));
                    closetag = false;
                    return;
                }
            }else {
                $.addtabs.add($.parseJSON(tabs[tabindex]));
            }
        }
        $.cookie("tabNodes",JSON.stringify(tabs));
        closetag = false;

    };
    _findArrayElem = function( arrayToSearch,attr,val ) {
        for (var i=0;i<arrayToSearch.length;i++){
            var itemarray = $.parseJSON(arrayToSearch[i]);
            if(itemarray[attr]==val){
                return i;
            }
        }
        return -1;
    };
    _activeArrayElem = function( arrayToSearch,index,attr,val,clostboolean ) {
        var itemarray = $.parseJSON(arrayToSearch[index]);
        var isremove=false;
        if(!clostboolean) {
            itemarray[attr] = val;
            tabs.splice(index, 1, JSON.stringify(itemarray));
        }
        if (clostboolean){
            for (var i=0;i<arrayToSearch.length;i++) {
                var itemarrayclose = $.parseJSON(arrayToSearch[i]);
                if( i == index && itemarrayclose[attr]==val){
                    isremove=true;
                    break;
                }
            }
            if(index>0 && isremove){
                var preitemarray = $.parseJSON(arrayToSearch[index-1]);
                preitemarray[attr] = val;
                tabs.splice(index-1, 2, JSON.stringify(preitemarray));
            }
            if((index==0 && isremove) || !isremove)
            {
                tabs.splice(index, 1);
            }
        }
    };
    _inactiveArrayElem = function( arrayToSearch,attr,val,clostboolean ) {
        if (!clostboolean){
           for (var i=0;i<arrayToSearch.length;i++){
                var itemarray = $.parseJSON(arrayToSearch[i]);
                itemarray[attr]=val;
                tabs.splice(i,1,JSON.stringify(itemarray));
            }
        }
    };

    $.addtabs = function(options) {
        $.addtabs.set(options);
        _listen();
        var tabNodesCookie = $.cookie("tabNodes");
        if ( tabNodesCookie != undefined && tabNodesCookie.length > 0 ){
            var nodeOptions = $.parseJSON(tabNodesCookie);
            tabs = nodeOptions;
            for(var i = 0 ;i < nodeOptions.length; i++){
                var singleNodeOption = $.parseJSON(nodeOptions[i]);
                $.addtabs.add(singleNodeOption);
            }
        }
        $.addtabs.drop();
    };
    $.addtabs.set = function() {
        if (arguments[0]) {
            if (typeof arguments[0] == 'object') {
                settings = $.extend(settings, arguments[0] || {});
            } else {
                settings[arguments[0]] = arguments[1];
            }
        }
        if (typeof settings.target == 'object') {
            target = settings.target;
        } else {
            target = $('body').find(settings.target).length > 0 ? $(settings.target).first() : $('body').find('.nav-tabs').first();
        }
    }
        
    $.addtabs.add = function(opts) {
        var a_target, content;
        opts.id = opts.id ? opts.id : Math.random().toString(36).substring(3, 35);
        if (typeof opts.target == 'object') {
            a_target = opts.target;
        } else if (typeof opts.target == 'string') {
            a_target = $('body').find(opts.target);
        } else {
            a_target = target;
        }
        var id = 'tab_' + opts.id;
        var tab_li = a_target;
        var tab_content = tab_li.next('.tab-content');
        var tabtitle;
        if(opts.title.length>10){
            tabtitle=opts.title.substr(0,9) + '...';
        }else {
            tabtitle=opts.title;
        }
        var isload = true;
        if (tab_content.find('#iframe_' + id).attr("id") == undefined){
            isload = false;
        }
        //如果TAB不存在，创建一个新的TAB
        if (tab_li.find('#tab_' + id).length < 1) {
            //创建新TAB的title
            var title = $('<li>', {
                'role': 'presentation',
                'id': 'tab_' + id,
                'aria-url': opts.url,
                'aria-ajax': opts.ajax ? true : false
            }).append($('<a>', {
                'href': '#' + id,
                'aria-controls': id,
                'role': 'tab',
                'data-toggle': 'tab'
            }).html(tabtitle));
            //是否允许关闭
            if (settings.close) {
                title.append($('<i>', {
                    'class': 'close-tab glyphicon glyphicon-remove'
                }));
            }
            //创建新TAB的内容
            var content = $('<div>', {
                'class': 'tab-pane',
                'id': id,
                'role': 'tabpanel'
            });
            //加入TABS
            tab_li.append(title);
            tab_content.append(content);
        } else if (!opts.refresh) {
            if (isload){
               // console.log(tab_content.find('#iframe_' + id).attr("id"));
                tab_li.find('li[role = "presentation"].active').removeClass('active');
                tab_content.find('div[role = "tabpanel"].active').removeClass('active');
                tab_li.find('#tab_' + id).addClass('active');
                tab_content.find('#' + id).addClass('active');
                _newtabcreatcookie(opts);
            }
        }  else {
             $('#' + id).html('');
        }
        if (!isload || opts.refresh){
            //active tab and load tabPaneContent
            _activeTabAndLoadTabPaneContent(tab_li,tab_content,id,opts);
            //process cookie information
            _newtabcreatcookie(opts);
        }
    };
    //active tab and load tabPaneContent
    _activeTabAndLoadTabPaneContent = function (tab_li,tab_content,id,opts) {
        //激活TAB
        if ( opts.active) {
            tab_li.find('li[role = "presentation"].active').removeClass('active');
            tab_content.find('div[role = "tabpanel"].active').removeClass('active');
            tab_li.find('#tab_' + id).addClass('active');
            tab_content.find('#' + id).addClass('active');
            //是否指定TAB内容
            if (opts.content) {
                $("#"+id).append(opts.content);
            } else if (settings.iframe == true && (opts.ajax == 'false' || !opts.ajax)) { //没有内容，使用IFRAME打开链接
                $("#"+id).append($('<iframe>', {
                    'class': 'iframeClass',
                    'height': settings.iframeHeight,
                    'frameborder': "no",
                    'border': "0",
                    'src': opts.url,
                    'id':'iframe_'+id
                }));
            } else {
                content.load(opts.url);
            }
        }
    };
    //process cookie information
    _newtabcreatcookie = function (opts) {
        var isnewadd = true;
        var tabNodesCookie = $.cookie("tabNodes");
        if ( tabNodesCookie != undefined && tabNodesCookie.length > 0 ) {
            var nodeOptions = $.parseJSON(tabNodesCookie);
            for (var i = 0 ; i < nodeOptions.length ; i++){
                if($.parseJSON(nodeOptions[i])["id"] == opts.id ){
                    isnewadd = false;
                    break;
                }
            }
        }
        if(isnewadd && !opts.refresh){
            var optionjson = JSON.stringify(opts);
            _inactiveArrayElem(tabs,'active',false);
            tabs.push(optionjson);
            $.cookie("tabNodes",JSON.stringify(tabs));
        }
    };
    $.addtabs.close = function(opts) {
        //如果关闭的是当前激活的TAB，激活他的前一个TAB
        if ($("#tab_" + opts.id).hasClass('active')) {
            if ($('#tab_' + opts.id).parents('li.tabdrop').length > 0 && !$('#tab_' + opts.id).parents('li.tabdrop').hasClass('hide')) {
                $('#tab_' + opts.id).parents('.nav-tabs').find('li').last().addClass('active');
            } else {
                $("#tab_" + opts.id).prev('li').addClass('active');
            }
            $("#" + opts.id).prev().addClass('active');
        }
        //关闭TAB
        $("#tab_" + opts.id).remove();
        $("#" + opts.id).remove();
        $.addtabs.drop();
        settings.callback();
    };
    $.addtabs.closeAll = function(target) {
        if (typeof target == 'string') {
            target = $('body').find(target);
        }
        $.each(target.find('li[id]'), function() {
            var id = $(this).children('a').attr('aria-controls');
            $("#tab_" + id).remove();
            $("#" + id).remove();
        });
        target.find('li[role = "presentation"]').first().addClass('active');
        var firstID = target.find('li[role = "presentation"]').first().children('a').attr('aria-controls');
        $('#' + firstID).addClass('active');
        $.addtabs.drop();
    };
    $.addtabs.drop = function() {
        //创建下拉标签
        var dropdown = $('<li>', {
            'class': 'dropdown pull-right hide tabdrop tab-drop'
        }).append($('<a>', {
            'class': 'dropdown-toggle',
            'data-toggle': 'dropdown',
            'href': '#'
        }).append($('<i>', {
            'class': "glyphicon glyphicon-align-justify"
        })).append($('<b>', {
            'class': 'caret'
        }))).append($('<ul>', {
            'class': "dropdown-menu"
        }))
        $('body').find('.nav-tabs').each(function() {
            var element = $(this);
            //检测是否已增加
            if (element.find('.tabdrop').length < 1) {
                dropdown.prependTo(element);
            } else {
                dropdown = element.find('.tabdrop');
            }
            //检测是否有下拉样式
            if (element.parent().is('.tabs-below')) {
                dropdown.addClass('dropup');
            }
            var collection = 0;
            //检查超过一行的标签页
            element.append(dropdown.find('li')).find('>li').not('.tabdrop').each(function() {
                if (this.offsetTop > 0 || element.width() - $(this).position().left - $(this).width() < 100) {
                    dropdown.find('ul').prepend($(this));
                    collection++;
                }
            });
            //如果有超出的，显示下拉标签
            if (collection > 0) {
                dropdown.removeClass('hide');
                if (dropdown.find('.active').length == 1) {
                    dropdown.addClass('active');
                } else {
                    dropdown.removeClass('active');
                }
            } else {
                dropdown.addClass('hide');
            }
        })
    }
})(jQuery);
$(function() {
    $.addtabs();
})