const awsS3BucketName = '...'
const awsAccessKey = '...'
const awsSecretKey = '...'
const apiUrl = '...'

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    apiUrl: apiUrl,
    awsAccessKey: awsAccessKey,
    awsSecretKey: awsSecretKey,
    awsS3BucketName: awsS3BucketName
  }
}
