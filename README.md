
# Install SAM
https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html

# Create project
```
$ sam init
Which template source would you like to use?
	1 - AWS Quick Start Templates
	2 - Custom Template Location
Choice: 1
What package type would you like to use?
	1 - Zip (artifact is a zip uploaded to S3)
	2 - Image (artifact is an image uploaded to an ECR image repository)
Package type: 2

Which base image would you like to use?
	1 - amazon/nodejs14.x-base
	2 - amazon/nodejs12.x-base
	3 - amazon/nodejs10.x-base
	4 - amazon/python3.8-base
	5 - amazon/python3.7-base
	6 - amazon/python3.6-base
	7 - amazon/python2.7-base
	8 - amazon/ruby2.7-base
	9 - amazon/ruby2.5-base
	10 - amazon/go1.x-base
	11 - amazon/java11-base
	12 - amazon/java8.al2-base
	13 - amazon/java8-base
	14 - amazon/dotnet5.0-base
	15 - amazon/dotnetcore3.1-base
	16 - amazon/dotnetcore2.1-base
Base image: 1

Project name [sam-app]: aws-sam-soap-example

Cloning app templates from https://github.com/aws/aws-sam-cli-app-templates

    -----------------------
    Generating application:
    -----------------------
    Name: aws-sam-soap-example
    Base Image: amazon/nodejs14.x-base
    Dependency Manager: npm
    Output Directory: .

    Next steps can be found in the README file at ./aws-sam-soap-example/README.md

```

# LAMBDA SOAP EXAMPLE
```
const soap = require('soap');

exports.lambdaHandler = async (event, context) => {
    try {
        const url = 'http://www.thomas-bayer.com/axis2/services/BLZService?wsdl';

        const client = await soap.createClientAsync(url)
    
        console.log(client)
    
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world test',
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
```

Add soap library in package.json
```
  ...
  "dependencies": {
    "axios": "^0.21.1",
    "soap": "^0.37.0"
  },
  ...
```
Running your project in your local environment
```
$ sam build
$ sam local invoke --debug
```

Output sample
```
$ sam build       
Building codeuri: /home/ubuntu/Workspaces/veryvolt/veryvolt-ceeal-integration/aws-sam-soap-example runtime: None metadata: {'DockerTag': 'nodejs14.x-v1', 'DockerContext': '/home/ubuntu/Workspaces/veryvolt/veryvolt-ceeal-integration/aws-sam-soap-example/hello-world', 'Dockerfile': 'Dockerfile'} functions: ['HelloWorldFunction']
Building image for HelloWorldFunction function
Setting DockerBuildArgs: {} for HelloWorldFunction function
Step 1/4 : FROM public.ecr.aws/lambda/nodejs:14
 ---> 461fe7efb2d6
Step 2/4 : COPY app.js package.json ./
 ---> 42a4c027c467
Step 3/4 : RUN npm install
 ---> Running in 51c783409d15
npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
npm WARN deprecated har-validator@5.1.5: this library is no longer supported
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@~2.3.1 (node_modules/chokidar/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

added 158 packages from 147 contributors and audited 159 packages in 6.051s

20 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

 ---> bb905eb4935c
Step 4/4 : CMD ["app.lambdaHandler"]
 ---> Running in 2e33621138e4
 ---> d476c16916c0
Successfully built d476c16916c0
Successfully tagged helloworldfunction:nodejs14.x-v1

Build Succeeded

Built Artifacts  : .aws-sam/build
Built Template   : .aws-sam/build/template.yaml

Commands you can use next
=========================
[*] Invoke Function: sam local invoke
[*] Deploy: sam deploy --guided
    
$
$
$ sam local invoke
Invoking Container created from helloworldfunction:nodejs14.x-v1
Building image.................
Skip pulling image and use local one: helloworldfunction:rapid-1.22.0.

START RequestId: 1d0b16e6-79b4-4ef0-a061-e1a5c5becb30 Version: $LATEST
    xml: '<?xml version="1.0"?><wsdl:definitions xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns="http://schemas.xmlsoap.org/wsdl/" xmlns:wsaw="http://www.w3.org/2006/05/addressing/wsdl" xmlns:http="http://schemas.xmlsoap.org/wsdl/http/" xmlns:tns="http://thomas-bayer.com/blz/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:mime="http://schemas.xmlsoap.org/wsdl/mime/" xmlns:soap=} [Symbol(kCapture)]: false] initParams], [Function (anonymous)] },com/axis2/services/BLZService"></http:address>\n' +n' +esponse"></wsdl:output>\n' +
END RequestId: 1d0b16e6-79b4-4ef0-a061-e1a5c5becb30
REPORT RequestId: 1d0b16e6-79b4-4ef0-a061-e1a5c5becb30  Init Duration: 0.10 ms  Duration: 1423.03 ms    Billed Duration: 1500 ms        Memory Size: 128 MB     Max Memory Used: 128 MB
```