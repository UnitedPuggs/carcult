# carcult
## the next best thing for finding car meets
Created by car enthusiasts, for car enthusiasts. The aim of the passion project is to connect the enthusiast with the meet. 

The current system is hoping to find something semi-active on some form of social media, but we think that's backwards. 
Why should *you* be seeking out meets and not the other way around? That's the gap that we're trying to bridge. 
Current options are out-dated (*cough* *cough* socalcarculture), abandoned (carmeets.app), or don't include the little guys, such as our very own Fullerton Motor Group.
We want to facilitate the interaction between host and enthusiast from the most general, prestigious types of meets to your local parking garage meets.

Built by Eddie Poulson using SvelteKit for just about everything, Auth.js to make logging in easy and secure, 
TailwindCSS to make things look pretty, and Supabase Database and Storage for data retention.

## features 
- A garage that users are able to personalize with their cars, a fun profile picture, and a little bit about themselves ☑
- The actual meeting component, which is more or less just a built-by-hand calendar component ☑
- A forum for users to talk about cars and car-related stuff ☑
- Another go at creating a marketplace for vehicles/vehicle parts ☑

### garage
The first fully-functioning feature of carcult. Either the most or least difficult part of the project and it looks like it's leaning towards most.
Users can add "vehicles" to their garage, which includes a name, main image, and description. These work as links to a more detailed vehicle page.
Users are also able to change their profile picture and bio :)
![image](https://github.com/UnitedPuggs/carcult/assets/48199805/3cd44aa3-4838-42c7-9822-fc759d377509)
![image](https://github.com/UnitedPuggs/carcult/assets/48199805/b87763b5-8807-4bb4-b52a-26f88bc8d04c)
![image](https://github.com/UnitedPuggs/carcult/assets/48199805/7ee998d9-ceac-483f-8344-902ecb1a7223)
![image](https://github.com/UnitedPuggs/carcult/assets/48199805/74b84764-1f35-4863-8586-95be1ff267de)
![image](https://github.com/UnitedPuggs/carcult/assets/48199805/517c2f42-2586-44b1-8fdd-f306e505e1b2)
![image](https://github.com/UnitedPuggs/carcult/assets/48199805/cebcf787-c76a-4d6f-8dba-40515e0718e6)
![image](https://github.com/UnitedPuggs/carcult/assets/48199805/398fdde8-00f0-458f-af42-b2c80a560039)

### meets
The big ol selling point and the driving idea behind the entire project. Verified users are able to create meets and all users are able to check out this calendar.
Everything is built by hand, no extra libraries mostly because I couldn't find anything I liked that had enough documentation to really properly utilize it for this project.
![image](https://github.com/UnitedPuggs/carcult/assets/48199805/3e4aea33-0eee-4438-886c-be65c8b59b63)
![image](https://github.com/UnitedPuggs/carcult/assets/48199805/73010e29-3b9b-49fc-b58a-421b3485a989)
![image](https://github.com/UnitedPuggs/carcult/assets/48199805/b6489b4b-c768-403a-9398-89a0ee8b4230)
![image](https://github.com/UnitedPuggs/carcult/assets/48199805/d139a226-6c8b-4139-b70e-948976d84ce0)
![image](https://github.com/UnitedPuggs/carcult/assets/48199805/d3d5a96d-19af-46e4-9af9-8ba129c5cee2)

### marketplace
Believe it or not, this is the place where users are going to be able to list their cars, parts, and services that they're wanting to offer. Currently a work in progress, but uhh don't look too closely
at the styling when compared to Facebook Marketplace. Included a very cool listing preview and realtime chat, which has been done by utilizing Supabase Realtime.
![image](https://github.com/UnitedPuggs/carcult/assets/48199805/8cbe9764-d7de-4f0e-9257-dcc91494adb6)
![image](https://github.com/UnitedPuggs/carcult/assets/48199805/9b682f7d-0517-49da-8807-dc05d3a1efa0)
![image](https://github.com/UnitedPuggs/carcult/assets/48199805/0c319ea7-c8b3-4af4-a515-fcddbc6eb4c8)
