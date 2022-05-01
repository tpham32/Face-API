# Microsoft Azure Face API 

Hi there! Thank you for stopping by this repository. In this documentation, we will go over on how to test the features below.

**Face - Detect:**
Detect human faces in an image, return face rectangles, and optionally with faceIds, landmarks, and attributes.
**Face - Verify:**
Verify whether two faces belong to a same person or whether one face belongs to a person.

## Let's get started

In this documentation, we will be using POSTMAN to test out the API endpoints. To do this, we will need to obtain the URL for the images we want to test.

### Image requirements 

The minimum detectable face size is 36x36 pixels in an image no larger than 1920x1080 pixels. Images with dimensions higher than 1920x1080 pixels will need a proportionally larger minimum face size.

Higher face image quality means better identification precision. Please consider high-quality faces: frontal, clear, and face size is 200x200 pixels (100 pixels between eyes) or bigger.

For optimal results when querying Face - Detect and Face - Verify, please use faces that are: frontal, clear, and with a minimum size of 200x200 pixels (100 pixels between eyes)

### How to obtain image URL

First, find an image. This could be from any anywhere on the Web really. Once the image is found, right click on the images and most web browser will say something like this "Copy image link" or "Copy image address". and that is it! you have gotten the URL for that image. 

The image URL will looks something like this link below
```
https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80
```

## How to use Postman

If Postman is not installed, please click on the link below and add it your device.

```
https://www.postman.com/downloads/
```

### Add URL enpoints

Once Postman is installed, open the application and proceed to add the URL below into the placeholder "Enter request URL"

```
http://159.89.235.8:3000/
```
To the left, next to the placeholder "Enter request URL", click the drop down calls request and pick "POST". 
Now pick either one of the available endpoints below to continue with API request.

```
detect
verify
```

As result, we add the endpoints to the URL.
```
http://159.89.235.8:3000/detect
http://159.89.235.8:3000/verify
```
Now we are ready to add the keys and images URL to complete the request. The next 2 sections will go more details about the body params

### How to make request with Detect endpoints

Make sure "POST" request is selected
Go to "Body" section, then pick "x-www-form-urlencoded". 
Add the name below to "KEY" for detect enpoint. Make sure to copy the exact "imageUrl" or else it will not works.

```
imageUrl
```

Then add the copied image URL obtained earlier from the web to "VALUE".
For example, the URL below is a picture of a couple. The result should returns two faceId.

```
https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/rahul-disha_1.jpg
```

Once pressed send, the result will displayed as below.

```
[{
        "faceId": "63722425-be32-414e-8f6d-75021a058af2",
        "faceRectangle": {
            "top": 134,
            "left": 447,
            "width": 270,
            "height": 349
        }},
    {
        "faceId": "d458239c-1935-4ad3-b34b-a27fcd0ca75c",
        "faceRectangle": {
            "top": 202,
            "left": 199,
            "width": 250,
            "height": 334
        }
}]
```

### How to make request with Verify endpoints

The same process will apply just like the detect endpoint, but in this endpoint, there are 2 images required which needs 2 different keys and URL for the images.

Go to "Body" section, then pick "x-www-form-urlencoded". Add pic1 for the first key and pic2 for the second key. 

```
pic1
```
```
pic2
```

Now add the two image URLs for the two keys above in the "VALUE" sections. Example, below are two different images of the same person.

```
https://media.self.com/photos/618eb45bc4880cebf08c1a5b/3:2/w_2688,h_1792,c_limit/1236337133
```
```
https://media.vanityfair.com/photos/5b46274a6520f70b78e5cfe5/1:1/w_960,h_960,c_limit/The-Rock-2020-Potential-Run.jpg
```

As result, we get Identical as true, this means this the same person in both pictures.

```{
    "isIdentical": true,
    "confidence": 0.73855
}
```
