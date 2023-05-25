import React from 'react';
import Navigation from './/Navigation';

const VideosPage = () => {
  const videoData = [
    {
      id: 1,
      title: 'Video 1',
      description: 'Description of Video 1',
      videoUrl: 'https://www.youtube.com/watch?v=video1',
    },
    {
      id: 2,
      title: 'Video 2',
      description: 'Description of Video 2',
      videoUrl: 'https://www.youtube.com/watch?v=video2',
    },
    {
      id: 3,
      title: 'Video 3',
      description: 'Description of Video 3',
      videoUrl: 'https://www.youtube.com/watch?v=video3',
    },
    {
      id: 4,
      title: 'Video 4',
      description: 'Description of Video 4',
      videoUrl: 'https://www.youtube.com/watch?v=video4',
    },
    {
      id: 5,
      title: 'Video 5',
      description: 'Description of Video 5',
      videoUrl: 'https://www.youtube.com/watch?v=video5',
    },
    {
      id: 6,
      title: 'Video 6',
      description: 'Description of Video 6',
      videoUrl: 'https://www.youtube.com/watch?v=video6',
    },
    {
      id: 7,
      title: 'Video 7',
      description: 'Description of Video 7',
      videoUrl: 'https://www.youtube.com/watch?v=video7',
    },
    {
      id: 8,
      title: 'Video 8',
      description: 'Description of Video 8',
      videoUrl: 'https://www.youtube.com/watch?v=video8',
    },
    {
      id: 9,
      title: 'Video 9',
      description: 'Description of Video 9',
      videoUrl: 'https://www.youtube.com/watch?v=video9',
    },
    {
      id: 10,
      title: 'Video 10',
      description: 'Description of Video 10',
      videoUrl: 'https://www.youtube.com/watch?v=video10',
    },
    {
      id: 11,
      title: 'Video 11',
      description: 'Description of Video 11',
      videoUrl: 'https://www.youtube.com/watch?v=video11',
    },
    {
      id: 12,
      title: 'Video 12',
      description: 'Description of Video 12',
      videoUrl: 'https://www.youtube.com/watch?v=video12',
    },   
    // Add more video data as needed
  ];

  return (
    <div className="container mx-auto">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Personal Finance App</h1>
        <Navigation />
      </header>

      <main>
        <section className="my-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Personal Finance Education</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec pretium lectus.
              Fusce consectetur congue diam, sed tincidunt ipsum lacinia nec. Pellentesque ut
              pharetra libero. Duis dapibus felis et ex dapibus rutrum. Quisque sagittis gravida
              felis. Curabitur in ex vitae neque convallis aliquam. Nulla facilisi. Nulla ornare
              purus quis nisi feugiat, ut varius quam iaculis.
            </p>
          </div>
        </section>

        <section className="my-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {videoData.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                >
                  <h3 className="text-lg font-bold mb-2">{video.title}</h3>
                  <iframe
                    className="w-full"
                    height="315"
                    src={video.videoUrl}
                    title={video.title}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                  <p className="text-sm mt-2">{video.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>{/* Add your site footer */}</footer>
    </div>
  );
};

export default VideosPage;
