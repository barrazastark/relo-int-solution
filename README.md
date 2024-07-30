# Image Annotation Analyzer - Front-End Coding Challenge (React - TypeScript)

Welcome to our front-end coding challenge! Your goal is to build a React app for an interactive image annotation tool. This tool will allow users to draw bounding boxes on images, assign categories, and submit annotations for further processing.

## Project Structure

- **README.md** (this file): Provides an overview of the challenge and instructions.
- **template.html**: A basic HTML template with CSS to guide the visual structure of the analyzer.
  - This template acts as a reference for the layout and styling of the application.
  - Feel free to extract its CSS and HTML to use it in your components.

## Implementation Notes

- We recommend structuring your application with a focus on reusability and separation of concerns.
- Use any tools or libraries you're comfortable with to complete the task as long as you use React and TypeScript.
- Consider using a state management library like Zustand or Redux for handling complex application states.
- **AI Tools**: While AI tools can be helpful, we discourage their use to generate code. Your project will be evaluated in a code review/pair programming session where your understanding of the code and problem-solving approach will be assessed.
- **Time Management**: We suggest spending no more than 2 hours on this challenge. While you have up to 4 days to submit, the intention is to assess your ability to deliver a focused solution within a reasonable timeframe.

## Functionality Requirements

### Use Case
 - The intention of this analyzer is to annotate visual detections in images
 - The user will be presented with images to annotate
 - The user will be able to select a category for the image
 - The user will be able to draw a bounding box around the detected object
 - The user will be able to submit the annotation
 - The user will be able to discard the annotation
 - The annotation will be sent to the server for further processing based on the detection position, size and category.

### Image Queue

- Fetch unanalyzed images from the following endpoint: 
  - GET - https://5f2f729312b1481b9b1b4eb9d00bc455.api.mockbin.io/unanalyzed-images
- Display images sequentially, allowing only one annotation at a time.

### Category Selection

- Fetch a list of categories from the following endpoint: 
  - GET - https://f6fe9241e02b404689f62c585d0bd967.api.mockbin.io/categories
- Provide a user interface to select a single category for each image.

### Bounding Box Drawing

- Enable users to draw a single bounding box on the image.
- Store the coordinates of the bounding box.

### Annotation Submission

- **Complete**: When the user clicks "Complete," send a POST request to the following endpoint: 
  - POST - https://eb1b6f8bfab448df91c68bd442d6a968.api.mockbin.io/annotations
  - 
    The request body should have this structure:
    ```json
    {
        "imageId": number,
        "annotations": [{
            "categoryId": number,
            "boundingBoxes": [{
                "topLeftX": number,
                "topLeftY": number,
                "width": number,
                "height": number
            }]
        }]
    }
    ```

- **Discard**: Send a POST request with the same body structure but with an empty annotations array.
- **Validation**: The "Complete" button should be enabled only when a category and a bounding box are selected.

## Submission

1. Commit your changes and push them to a remote repository.
2. Send us the repository link (we won't consider any commit pushed after you send us your submission).
3. Include instructions to setup the project locally and a brief description of your project and any notes you want to share with us

## Evaluation Criteria

- **React Best Practices**: Use appropriate components, hooks, and state management.
- **Code Quality**: Clear, concise, and well-organized code.
- **Functionality**: All requirements are implemented correctly.
- **Error Handling**: Gracefully handle network errors and invalid input.
- **[NOTE]** We won't evaluate the visual design of the application. Focus on functionality and code quality.


We're excited to see your implementation!

Feel free to ask clarifying questions if needed. Good luck!