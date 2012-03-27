import sys, os, json, cgi

def application(env, start_response):
    content_type = 'text/html'
    response_body = ""

    for s in env["wsgi.input"].readlines():
        s = s.rstrip()
        print >> sys.stderr, "NACLOG: " + s + "\n"

    response_body = "OK"
    response_headers = []
    status = "200 OK"
    response_headers.append(('Content-Length', str(len(response_body))))
    response_headers.append(('Content-Type', 'text/html; charset=UTF-8'))
    start_response(status, response_headers)
    return [str(response_body)]
