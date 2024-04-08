import React from 'react';
import './HealthTips.css';
import dumbbellIcon from '../../assets/imgs/dumbbell.png';
import dietIcon from '../../assets/imgs/diet.png';
import psychologyIcon from '../../assets/imgs/psychology.png';
import seasonsIcon from '../../assets/imgs/seasons.png';


/**
 *The `HealthTips` page provides a range of health and wellness tips, including diet, 
 *exercise, mental health and seasonal advice. Each section is accompanied by a relevant icon 
 *and contains an embedded YouTube video designed to improve the user's daily lifestyle.
 *
 * No props.
 *
 * The component includes the following sections:
 * - Diet Advice
 * - Exercise & Fitness
 * - Mental Health
 * - Seasonal Health Tips
 *
 */

 
const HealthTips = () => {
  return (
    <div className="health-tips-container">
      <h1>Daily Health Tips</h1>

      
      <section className="tips-section">
  <h2>Diet Advice <img src={dietIcon} alt="Diet Icon" className="icon" /> </h2>
  <ul>
    <li>Control total energy to maintain ideal weight. Gradually reduce weight if over the normal standard. Combine individual height, weight, and physical activity to determine the appropriate diet quantity. People over 40 should especially prevent becoming overweight. The simple calculation for normal weight is: BMI = kg (weight) / m² (height squared), with 19~24 being the normal range, over 25 overweight, and over 28 obese.</li>
    <li>Eat an appropriate amount of staple food: 5~8 taels daily, mainly rice and flour, with 1/3 of daily staple food being coarse grains.</li>
    <li>Eat plenty of vegetables: about 1 jin daily, focus on choosing dark green and red vegetables; 1~2 medium-sized fruits daily, cannot replace fruits with processed juice drinks.</li>
    <li>Eat meat in moderation: 1~2 taels of fish and shrimp per day, 1 to 1.5 taels of lean pork (or beef, lamb), chicken and duck meat can replace pork after removing the skin. 1 boiled egg white. No more than 3 egg yolks per week.</li>
    <li>Half a jin of low-fat milk and half a tael of soybeans (or about 1 tael of dried tofu, 2~3 taels of tofu) daily.</li>
    <li>Eat light and less salt: Besides the quantity of fat, the type of fat is more important. Choose vegetable oils rich in unsaturated fatty acids for cooking, such as soybean oil, rapeseed oil, blended oil, tea oil, olive oil, etc., about 20 grams, approximately 2 tablespoons. Less than 6 grams of salt per day, do not consume additional salty foods like pickles, soy sauce, fermented tofu, sesame paste, etc.</li>
    <li>Food to avoid or eat less: Animal fats such as lard, butter, chicken fat, cream, etc.; animal offal like brain, liver, kidneys, etc.; foods rich in cholesterol like fatty meat, fish roe, egg yolks, preserved eggs; cream cakes, desserts, sweet drinks; spicy and stimulating seasonings; strong alcohol; strong coffee, tea, and meat broth.</li>
    <li>Meal arrangements should be small and frequent, avoid overeating, and dinner should avoid intake of too greasy and indigestible food. Advocating walking for 30~60 minutes after dining for half an hour.</li>
  </ul>
        <div className="video-container">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/Q4yUlJV31Rk?si=0j30H9ylZDonNYCI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>

        </section>

<section className="tips-section">
  <h2>Exercise & Fitness <img src={dumbbellIcon} alt="Dumbbell Icon" className="icon" /> </h2>
  <p>Regular exercise has numerous benefits for the body and mind, including:</p>
  <ul>
    <li><strong>Improving the Cardiovascular System:</strong> Effective heart contractions and smooth blood circulation can promote the blood supply to the coronary arteries. Consistent exercise can lower heart rate, including the resting heart rate, and improve the elasticity of blood vessels, helping to reduce blood pressure.</li>
    <li><strong>Strengthening the Musculoskeletal System:</strong> Increases in bone and muscle mass, as well as enhancements in muscle strength and flexibility, can prevent osteoporosis and sarcopenia, providing general support for the spine and muscles. Active movement also helps prevent falls and fractures in old age.</li>
    <li><strong>Cleansing the Respiratory System:</strong> Enhanced expansion capacity of the alveoli helps with oxygen intake, ensuring sufficient breathing volume, limiting the decrease in respiratory function caused by aging.</li>
    <li><strong>Improving Metabolism and Body Composition:</strong> Physical activity helps reduce body fat, increase lean body mass, and improve the muscle-to-fat ratio. Increased energy expenditure helps with weight control.</li>
    <li><strong>Beneficial Psychological Factors:</strong> Being in good health allows you to fully enjoy life and engage in various long-term activities. Participating in sports clubs also helps build social relationships, reducing the risk of depression and anxiety.</li>
  </ul>
</section>

        <div className="video-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/jN0pRAqiUJU?si=OFyrzeSJmsmFeRK0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>

<section className="tips-section">
  <h2>Mental Health <img src={psychologyIcon} alt="Psychology Icon" className="icon" /> </h2>
  <p>Maintaining mental health is crucial for overall well-being. Here are some tips to help reduce stress, improve mood, and maintain a positive outlook:</p>
  <ul>
    <li><strong>Practice Mindfulness:</strong> Spend a few minutes each day practicing mindfulness or meditation. These practices can help center your thoughts and reduce anxiety by focusing on the present moment.</li>
    <li><strong>Regular Exercise:</strong> Physical activity can significantly impact your mood. A simple daily walk or a short workout session can release endorphins, which are natural mood lifters.</li> 
    <li><strong>Healthy Eating:</strong> What you eat can affect your brain's health and your mood. Ensure a balanced diet rich in fruits, vegetables, and omega-3 fatty acids found in fish and flaxseeds.</li> 
    <li><strong>Quality Sleep:</strong> Good sleep is essential for mental health. Try to maintain a regular sleep schedule, create a restful environment, and avoid screens before bedtime to improve sleep quality.</li>
    <li><strong>Connect with Others:</strong> Building strong, healthy relationships with friends and family can provide you with support and reduce feelings of isolation. Don’t hesitate to share your feelings with someone you trust.</li>
    <li><strong>Set Realistic Goals:</strong> Break up large tasks into smaller, manageable steps. Setting achievable goals can help you feel more in control and reduce stress.</li>
    <li><strong>Limit Screen Time:</strong> Excessive time on social media or reading news can increase anxiety. Set limits on screen time and make time for offline activities you enjoy.</li>
    <li><strong>Seek Professional Help When Needed:</strong> If stress or anxiety is interfering with your daily life, consider seeking help from a mental health professional. There's no shame in asking for assistance.</li>
  </ul>
</section>

        <div className="video-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/gwmv_KGdceA?si=voUgcHeNa7IdqWjw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>

        
<section className="tips-section">
  <h2>Seasonal Health Tips <img src={seasonsIcon} alt="Seasons Icon" className="icon" /> </h2> 
  <ul>
    <li><strong>Spring:</strong> Spring brings renewal and blossoming flowers. If you're not allergic to pollen, it's a fantastic time for outdoor exercises. Choose a good weather day for activities like square dancing. Remember, early spring weather can be unstable, so don’t rush to change into lighter clothes too soon.</li>
    <li><strong>Summer:</strong> Summer's heat comes with thunderstorms and unpredictable weather. Always check the weather forecast before going out to avoid getting caught in the rain. Protect yourself from "air conditioning disease" by staying hydrated and avoiding excessive exposure to air conditioning. Green bean soup is great for cooling down.</li> 
    <li><strong>Autumn:</strong> Autumn, a season of harvest, offers a warm climate perfect for travel. Enjoy the holidays like Mid-Autumn Festival and National Day with loved ones. The weather is generally pleasant, making it ideal for exercising outdoors. Focus on consistency in your workout routine to enjoy the crisp autumn air.</li> 
    <li><strong>Winter:</strong> Winter calls for skin care due to dry conditions and cold winds. Keeping warm is crucial; prioritize health over fashion. Staying indoors all winter is not advisable as it can weaken your immune system. Make the most of sunny winter days for outdoor activities, which can boost your vitamin D levels and immunity.</li>
    </ul>
</section>

        <div className="video-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/KlfgN_muPXk?si=JI_TwqVq2NT12e3h" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
    </div>
  );
}

export default HealthTips;

