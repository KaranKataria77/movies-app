# Steps to run project on local machine

1. Clone the repository : git clone https://github.com/KaranKataria77/movies-app.git
2. cd movies-app
3. Install dependecies : npm i
4. Add .env file (variable name given end of the file)
5. npm run start

## Site Deployed Below Link

### https://joyful-tanuki-4347ce.netlify.app/

### Points covered

1. The project is written in TypeScript.
2. Aviod component re-rendering with the help of useMemo and useCallback hook
3. Added own Internal cache startegy to avoid API calls
4. Attempt to keep all components as stateless as possible.
5. Used Custome Hook useDebounce()
6. The data is not called all at once; instead, movies data is added as the user scrolls using the Browser Observer API.
7. A genre filter has been added.
8. A search box has been added to search by movie name, actors' names, and director's name.
9. An overview of the movie is displayed on the backside of the card as you hover over it.

### NOTE

Please add .env file while running project on local, named REACT_APP_API_KEY=2dca580c2a14b55200e784d157207b4d 
