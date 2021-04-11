terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }
}

provider "aws" {
  profile = "default"
  region  = var.region
}

resource "aws_iam_user" "deploy_user" {
  name = "deploy_user"
}

resource "aws_s3_bucket" "bucket" {
  bucket = "${var.bucket}"
  acl    = "private"

  tags = {
    Name        = "Humanity bucket"
    Environment = "Dev"
  }
}

resource "aws_lambda_function" "steps_lambda" {
   function_name = "ServerlessHumanitySteps"

   # The bucket name as created earlier with "aws s3api create-bucket"
   s3_bucket = "${var.bucket}"
   s3_key    = "${var.bucket_key}"

   handler = "dist/lambda.handler"
   runtime = "nodejs14.x"

   role = aws_iam_role.lambda_exec.arn
}

resource "aws_iam_role" "lambda_exec" {
   name = "serverless_steps_lambda"

   assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF

}

data "aws_iam_policy_document" "admin" {
  statement {
    actions   = ["s3:ListAllMyBuckets"]
    resources = ["arn:aws:s3:::*"]
    effect = "Allow"
  }
  statement {
    actions   = ["s3:*"]
    resources = [aws_s3_bucket.bucket.arn]
    effect = "Allow"
  }
}

resource "aws_iam_policy" "policy" {
  name        = "humanity-policy"
  description = "My test policy"
  policy = data.aws_iam_policy_document.admin.json
}


resource "aws_iam_user_policy_attachment" "attachment" {
  user       = aws_iam_user.deploy_user.name
  policy_arn = aws_iam_policy.policy.arn
}

resource "aws_lambda_permission" "apigw" {
   statement_id  = "AllowAPIGatewayInvoke"
   action        = "lambda:InvokeFunction"
   function_name = aws_lambda_function.steps_lambda.function_name
   principal     = "apigateway.amazonaws.com"

   # The "/*/*" portion grants access from any method on any resource
   # within the API Gateway REST API.
   source_arn = "${aws_api_gateway_rest_api.humanity.execution_arn}/*/*"
}

output "base_url" {
  value = aws_api_gateway_deployment.deploy.invoke_url
}

output "rendered_policy" {
  value = data.aws_iam_policy_document.admin.json
}