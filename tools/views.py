#encoding=utf-8

from django.shortcuts import render
from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
import sys, urllib, urllib2, json



# Create your views here.

# 渲染初始页面
def index(request):
	return render(request,'index.html')

# 渲染查询结果页面
def search(request):

	url = 'http://apis.baidu.com/apistore/weatherservice/weather?cityname='+request.GET['city']
	req = urllib2.Request(url)
	req.add_header("apikey", "c5ffb661093be3f9d7476e124001ac06")
	resp = urllib2.urlopen(req)
	content = resp.read()

	result = json.loads(content,encoding='UTF-8')	# 将字符转换为json
	template = get_template('result_tpl.html')	# 获取结果视图模板
	html = template.render(Context(result['retData']))	# 渲染结果视图模板

	return HttpResponse(html,content_type='text/html')	
	