# Group Project 2

# Overview

For this project, students are tasked with developing a front-end Angular application that interfaces with [Spotify's API](https://developer.spotify.com/documentation/web-api) in order to build a guessing game application. Students will read through the provided [REQUIREMENTS.md](REQUIREMENDS.md) file and use it to plan the application they will create with their team. After getting approval from their primary instructor they will develop the application and conduct an app demo on the end of the second group project.

## Project Planning

To start this project each team needs to meet on the first day of the project and create an action plan for their group. In this meeting they will read through the business requirements detailed in the section below, make a wireframe for the application in [Figma](https://www.figma.com/), determine components required to implement the wireframe, and fill out [this survey](https://forms.office.com/r/mqQyHDC5Bm) for the instructional team to review before anyone on the team starts development of their application. The instructional team will approve or request any changes no later than the second day of the project and do our best to ensure each team is able to begin development by the end of the second day.

## Requirements

##### The _Business Requirements_ are located in the [REQUIREMENTS.md](REQUIREMENTS.md) file.

The specification for this assessment is written in a way that resembles the kind of informal requirements document you may receive on a client site or the level of detail you may have after a few meetings with stakeholders/product owners. It is written from a non-technical viewpoint with no regards for the technical requirements that the project may incur.

When given large problems like this, it is easy to try to start coding immediately. This may not be the best approach to solving large problems - it can often make you waste a lot of time because you'll start solving problems before you really know what problems you need to solve. In order to get a sense for what is required technically, this project requires that you first go through the **_Business Requirements_** thoroughly and try to envision the end goal from a business point of view. After that, go through it again from a technical perspective and begin mapping out mentally and physically (on paper first if you like) the things you'll need to use and understand. For this project, these things may include: Missing requirements that you need to clarify, Spotify endpoints, A skeleton/wireframe of your components created with [Figma](https://www.figma.com/), routes, required business logic for the game state you design, how to play a song in the browser, and so on. Note that these things don't require you to start coding - they require you to **research** and **read documentation**.

## Technical Guidance

##### The following will be an unorganized collection of technical information that could be helpful for this assessment.

When debugging or trying to solve problems within the `Angular` and `TypeScript` ecosystem, it will be helpful to include `angular` or `typescript` in your google searches. For example, searching for `web playback typescript` gives me [`howler.js`](https://howlerjs.com/) which seems useful for playing audio. Learning how to _google well_ is one of the most important skills to hone as a developer - especially when dealing with a quickly changing ecosystem.

As you are planning out the game functionality of your application it would be a good idea to look at what functionality is available in [Spotify's API](https://developer.spotify.com/documentation/web-api) and adjust accordingly. The instructional team recommends utilizing the search endpoint and the playlists endpoints to build out game functionality, but feel free to use others if you find they fit your plan better.

When getting a `track` from [Spotify's API](https://developer.spotify.com/documentation/web-api), it gives you a `preview_url` which will be needed to play a **sample** for a given song.

To simplify authenticating with [Spotify's API](https://developer.spotify.com/documentation/web-api), a skeleton is given which calls a service in the cloud to get a `spotify_access_token`. An example request using this token is provided in the project (this example is deprecated but still valuable as an example of how to use the fetchFromSpotify function. A comment is provided to note that it should not be used during the project).

`services/api.ts` has been provided as a convenience wrapper around `fetch`

The code in the `services/api.ts` file should not need modification. If you feel that you need to modify it, please speak with an instructor before making any modifications.

URL encoding converts characters into a format that can be transmitted over the Internet. The URL encoding for a 'space' character is '%20'.

This assessment is large and you should use your time wisely. UI design and styling should be your LAST priority. When designing your wireframe focus first on functionality and second on design. When implementing always focus on MVP (minimum viable product) and ensure functionality of the features before diving into the styling rabbit hole. Once you've done that and it _works_, begin thinking about a minimal and clean UI. A business/product owner/stakeholder would much rather have something that doesn't look pretty, but works, than have something that looks great but doesn't do anything.
