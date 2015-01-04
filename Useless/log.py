import sys, os, json, cgi

def application(env, start_response):
    content_type = 'text/html'
    response_body = ""

    first = True
    while True:
        s = env["wsgi.input"].readline()
        if s == "":
            break
        s = s.rstrip()
        if first and s == "LOG_TO_FILE":
            fn = env["wsgi.input"].readline().rstrip()
            data = env["wsgi.input"].read()
            print >> sys.stderr, "NACLOG: LOG_TO_FILE:", fn, len(data), "bytes"
            f = open("/tmp/" + fn, 'a')
            f.write(data)
            f.close()
        else:
            print >> sys.stderr, "NACLOG: " + s + "\n"
        first = False

    response_body = "OK"
    response_headers = []
    status = "200 OK"
    response_headers.append(('Content-Length', str(len(response_body))))
    response_headers.append(('Content-Type', 'text/html; charset=UTF-8'))
    start_response(status, response_headers)
    return [str(response_body)]
