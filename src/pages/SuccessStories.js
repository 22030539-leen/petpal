import React, { useState } from "react";

const initialStories = [
  {
    id: 1,
    title: "Bella the Golden Retriever",
    petName: "Bella",
    text: "Bella was adopted by a loving family who take her hiking every weekend.",
  },
  {
    id: 2,
    title: "Milo the Cat",
    petName: "Milo",
    text: "Milo now lives with 2 kids who spoil him with treats.",
  },
];

export default function Stories() {
  const [stories, setStories] = useState(initialStories);
  const [ownerName, setOwnerName] = useState("");
  const [petName, setPetName] = useState("");
  const [storyText, setStoryText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ownerName.trim() || !petName.trim() || !storyText.trim()) return;

    const newStory = {
      id: Date.now(),
      title: `${petName}'s Happy Tail`,
      petName,
      text: storyText,
      owner: ownerName,
    };

    setStories([newStory, ...stories]);
    setOwnerName("");
    setPetName("");
    setStoryText("");
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-3" style={{ color: "#0147b3" }}>
        Success Stories ❤️
      </h2>
      <p className="text-center text-muted mb-4">
        Read real stories of pets who found their forever home — and share yours!
      </p>

      {/* Submit story form */}
      <div className="row mb-5">
        <div className="col-md-8 mx-auto">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="mb-3" style={{ color: "#0147b3" }}>
                Share Your Story
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Your Name</label>
                  <input
                    className="form-control"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="e.g. Sara"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Pet Name</label>
                  <input
                    className="form-control"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="e.g. Luna"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Your Story</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={storyText}
                    onChange={(e) => setStoryText(e.target.value)}
                    placeholder="Tell us how your pet found their forever home..."
                  />
                </div>

                <button type="submit" className="btn btn-primary rounded-pill px-4">
                  Submit Story
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Stories list */}
      <div className="row g-3">
        {stories.map((story) => (
          <div className="col-md-6" key={story.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title" style={{ color: "#0147b3" }}>
                  {story.title}
                </h5>
                {story.owner && (
                  <p className="text-muted mb-1">
                    Shared by <strong>{story.owner}</strong>
                  </p>
                )}
                <p className="card-text">{story.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}