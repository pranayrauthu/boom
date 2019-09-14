# boom

boom is a command line http tool.

## usage

create a file with name `file.http` with following content

```http
GET https://jsonplaceholder.typicode.com/posts/1
```

`boom x file.http` will execute the request in file.http

`boom c file.http` will convert the request in file.http to curl command.