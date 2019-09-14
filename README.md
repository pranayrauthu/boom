# boom

boom is a command line http tool.

[![NPM](https://nodei.co/npm/@prauthu/boom.png)](https://nodei.co/npm/@prauthu/boom/)

## usage

create a file with name `file.http` with following content

```http
GET https://jsonplaceholder.typicode.com/posts/1
```

`boom x file.http` will execute the request in file.http

`boom c file.http` will convert the request in file.http to curl command.

### usage with environments

create a file with name `.boom.json` with environments in following format.

```
{
    "activeEnvironment": "default",
    "enviroments": {
        "default": {
            "host": "https://jsonplaceholder.typicode.com"
        }
    }
}
```

and `file.http` with following content

```
GET {{host}}/posts/1
```
