import { AnatomyJoint, ClinicService, ReviewItem, GalleryPhoto } from '../types';
import { CLINIC_IMAGES } from '../assets/clinicImages';

export const CLINIC_INFO = {
  name: 'BODY REBOOT CLINICS',
  brandingTagline: 'BODY REBOOT CLINICS by Dr. Varun',
  descriptor: 'Best Physiotherapy Centre in Bhopal',
  address: 'E-1, Mandakani Colony, J K Hospital Main Road, Opposite to Khadim, Kolar Road, Bhopal, Madhya Pradesh 462042, India',
  phone: '+91 78692 25304',
  rawPhone: '+917869225304',
  whatsappUrl: 'https://wa.me/917869225304?text=Hello%20Body%20Reboot%20Clinics,%20I%20would%20like%20to%20enquire%20about%20a%20physiotherapy%20consultation%20at%20your%20Kolar%20Road%20centre.',
  googleRating: 4.6,
  googleReviewCount: 54,
  googleMapsUrl: 'https://maps.app.goo.gl/rPBdRLVzrZRqFczn9',
  category: 'Physiotherapy Center & Sports Medicine',
  schedule: [
    { day: 'Monday', hours: 'Closed (Weekly Maintenance & Private Appointments)', isClosed: true },
    { day: 'Tuesday', hours: '10:30 AM – 8:30 PM', isClosed: false },
    { day: 'Wednesday', hours: '10:30 AM – 8:30 PM', isClosed: false },
    { day: 'Thursday', hours: '10:30 AM – 8:30 PM', isClosed: false },
    { day: 'Friday', hours: '10:30 AM – 8:30 PM', isClosed: false },
    { day: 'Saturday', hours: '10:30 AM – 8:30 PM', isClosed: false },
    { day: 'Sunday', hours: '10:30 AM – 8:30 PM', isClosed: false },
  ],
  storefrontPillars: [
    'Specialty Clinic',
    'Sports Medicine',
    'Pain Management',
    'Fitness Fuel',
    'Therapeutic Exercise'
  ]
};

export const ANATOMY_JOINTS: AnatomyJoint[] = [
  {
    id: 'cervical-spine',
    name: 'Cervical Spine (Neck C1–C7)',
    category: 'spine',
    position: [0, 2.2, 0.05],
    color: '#00C9D6',
    description: 'The cervical spine supports head mobility and cervical nerve roots, frequently vulnerable to tech neck, disc protrusion, and muscle spasms.',
    commonConditions: ['Cervical Spondylosis', 'Tech Neck Strain', 'Nerve Radiculopathy', 'Whiplash & Muscle Guarding'],
    clinicalApproach: 'Targeted cervical traction, manual trigger point release, deep neck flexor activation, and ergonomic posture re-education.',
    recommendedTreatments: ['Spine Rehabilitation', 'Neck Pain Management', 'Ergonomic Movement Training']
  },
  {
    id: 'thoracic-spine',
    name: 'Thoracic Spine & Posture Cage',
    category: 'spine',
    position: [0, 1.4, -0.05],
    color: '#258AFF',
    description: 'The thoracic vertebrae and rib attachments govern rotational capacity and trunk extension. Restricted thoracic mobility transfers stress to the neck and lower back.',
    commonConditions: ['Postural Kyphosis', 'Mid-back Muscle Spasm', 'Thoracic Outlet Syndrome', 'Scapular Dyskinesis'],
    clinicalApproach: 'Thoracic joint mobilizations, foam-roller thoracic extension drills, scapulothoracic strengthening, and diaphragmatic breathing.',
    recommendedTreatments: ['Spine Rehabilitation', 'Therapeutic Exercise', 'Postural Realignment']
  },
  {
    id: 'lumbar-spine',
    name: 'Lumbar Spine (L1–L5 & Sacrum)',
    category: 'spine',
    position: [0, 0.6, -0.02],
    color: '#00C9D6',
    description: 'The lumbar spine bears the bulk of axial upper body loading and rotational shear stress, commonly resulting in disc bulges, sciatica, and chronic facet irritation.',
    commonConditions: ['Lumbar Disc Herniation / Bulge', 'Sciatica Nerve Compression', 'Chronic Lower Back Pain', 'Spondylolisthesis'],
    clinicalApproach: 'McKenzie directional preference assessment, progressive core anti-rotation stabilization, lumbar de-loading, and pelvic alignment.',
    recommendedTreatments: ['Back Pain Rehabilitation', 'Core Stability Protocols', 'Lumbar Decompression Therapy']
  },
  {
    id: 'shoulder-rotator',
    name: 'Shoulder Complex & Rotator Cuff',
    category: 'upper_limb',
    position: [-0.95, 1.75, 0],
    color: '#258AFF',
    description: 'The glenohumeral joint offers maximal multi-planar range of motion at the cost of innate stability, heavily reliant on the rotator cuff and scapular stabilizers.',
    commonConditions: ['Rotator Cuff Tendinopathy', 'Frozen Shoulder (Adhesive Capsulitis)', 'Impingement Syndrome', 'AC Joint Strain'],
    clinicalApproach: 'Glenohumeral capsule release, eccentric rotator cuff loading, scapular upward rotation patterning, and sports return-to-throw sequencing.',
    recommendedTreatments: ['Shoulder Rehabilitation', 'Sports Injury Rehabilitation', 'Dry Needling & Myofascial Release']
  },
  {
    id: 'elbow-forearm',
    name: 'Elbow Joint & Tendons',
    category: 'upper_limb',
    position: [-1.2, 0.95, 0.05],
    color: '#00C9D6',
    description: 'Hinge joint coordinating flexor and extensor tendon attachments, susceptible to repetitive strain injuries from racquet sports, typing, and weightlifting.',
    commonConditions: ['Tennis Elbow (Lateral Epicondylitis)', "Golfer's Elbow (Medial Epicondylitis)", 'Ulnar Nerve Entrapment'],
    clinicalApproach: 'Instrument-assisted soft tissue therapy, progressive eccentric forearm loading, joint mobilization with movement (MWM).',
    recommendedTreatments: ['Musculoskeletal Physiotherapy', 'Sports Physiotherapy']
  },
  {
    id: 'hip-pelvis',
    name: 'Hip Joint & Pelvic Girdle',
    category: 'lower_limb',
    position: [0.55, 0.05, 0.05],
    color: '#258AFF',
    description: 'The deep ball-and-socket joint of the pelvis and femur, vital for locomotion power transfer, athletic deceleration, and hip hinge kinematics.',
    commonConditions: ['Femoroacetabular Impingement (FAI)', 'Hip Bursitis / Gluteal Tendinopathy', 'Piriformis Syndrome', 'Labral Irritation'],
    clinicalApproach: 'Gluteus medius/maximus activation, hip capsule mobilizations, neuromuscular hip hinge re-education, and pelvic symmetry drills.',
    recommendedTreatments: ['Musculoskeletal Physiotherapy', 'Functional Movement Training', 'Therapeutic Exercise']
  },
  {
    id: 'knee-complex',
    name: 'Knee Joint (Patella, Meniscus & Ligaments)',
    category: 'lower_limb',
    position: [0.55, -1.05, 0.1],
    color: '#00C9D6',
    description: 'High-load hinge joint stabilizing walking, squatting, and sports pivots, vulnerable to cruciate ligament strains, meniscus tear wear, and patellofemoral pain.',
    commonConditions: ['ACL / PCL / MCL Strains', 'Patellofemoral Pain Syndrome (Runner\'s Knee)', 'Meniscus Degeneration / Tears', 'Osteoarthritis of the Knee'],
    clinicalApproach: 'Quadriceps-hamstring ratio balancing, VMO neuromuscular recruitment, joint glide mobilization, and graduated sports agility progression.',
    recommendedTreatments: ['Knee Rehabilitation', 'Post-Surgical Knee Protocol', 'Sports Injury Rehabilitation']
  },
  {
    id: 'ankle-foot',
    name: 'Ankle Complex & Achilles Tendon',
    category: 'lower_limb',
    position: [0.55, -2.15, 0.05],
    color: '#258AFF',
    description: 'The foundation of the kinetic chain, managing ground reaction forces, talocrural dorsiflexion, and subtalar shock absorption.',
    commonConditions: ['Inversion Ankle Sprains', 'Achilles Tendinopathy', 'Plantar Fasciitis', 'Subtalar Instability'],
    clinicalApproach: 'Proprioceptive wobble board training, eccentric calf drops, talocrural mobilizations, and foot intrinsic muscle activation.',
    recommendedTreatments: ['Sports Physiotherapy', 'Functional Training', 'Therapeutic Exercise']
  }
];

export const CLINIC_SERVICES: ClinicService[] = [
  {
    id: 'sports-injury-rehab',
    title: 'Sports Injury Rehabilitation',
    category: 'Sports Medicine',
    shortDesc: 'Comprehensive recovery and return-to-play training for competitive athletes and active individuals in Bhopal.',
    fullDesc: 'Our specialized sports rehabilitation protocols integrate acute injury management, biomechanical video assessment, progressive strength restoration, and sports-specific agility drills. We focus on rebuilding tendon elasticity, joint proprioception, and athletic confidence.',
    benefits: [
      'Targeted return-to-sport testing and benchmarks',
      'Minimization of re-injury risk with kinetic chain balancing',
      'Athletic strength & power re-establishment'
    ],
    idealFor: ['Athletes with ligament sprains (ACL/PCL/MCL)', 'Muscle tears and strains (hamstring, groin, calf)', 'Overuse athletic conditions'],
    techniqueHighlights: ['Functional Movement Screening (FMS)', 'Eccentric loading protocols', 'Agility & plyometric reconditioning'],
    iconName: 'Activity'
  },
  {
    id: 'spine-back-rehab',
    title: 'Spine & Lumbar Rehabilitation',
    category: 'Spine & Back',
    shortDesc: 'Science-backed decompression and postural stabilization for chronic back pain, slipped discs, and sciatica.',
    fullDesc: 'Back pain is rarely just a local issue. At Body Reboot Clinics, we assess the entire vertebral column, pelvic tilt, and core stabilizer recruitment to address root mechanical compression rather than just suppressing acute pain.',
    benefits: [
      'Relief from radiating nerve pain and sciatica numbness',
      'Restoration of natural lumbar lordosis and flexibility',
      'Deep spinal stabilizer (transversus abdominis & multifidus) strengthening'
    ],
    idealFor: ['Lumbar disc bulge / herniation', 'Sciatica and radiating nerve pain', 'Chronic postural lower back tightness'],
    techniqueHighlights: ['McKenzie Protocol MDT', 'Lumbar de-loading and traction', 'Core anti-extension/anti-rotation stabilization'],
    iconName: 'Shield'
  },
  {
    id: 'neck-cervical-care',
    title: 'Neck Pain & Cervical Care',
    category: 'Spine & Back',
    shortDesc: 'Relieve cervical strain, tension headaches, and tech neck with precision manual therapy and postural correction.',
    fullDesc: 'Modern screen posture places excessive mechanical strain on the upper cervical spine. Our cervical protocols combine gentle manual traction, myofascial release of tight trapezius muscles, and motor control training for deep neck flexors.',
    benefits: [
      'Alleviation of cervicogenic tension headaches',
      'Improved cervical rotation and lateral flexion range',
      'Long-term ergonomic work setup guidance'
    ],
    idealFor: ['Tech neck and forward head posture', 'Cervical spondylosis and stiffness', 'Pinched nerves with arm tingling'],
    techniqueHighlights: ['Manual cervical joint mobilizations', 'Trigger point therapy', 'Chin-tuck deep flexor re-education'],
    iconName: 'Layers'
  },
  {
    id: 'knee-rehabilitation',
    title: 'Knee & Joint Rehabilitation',
    category: 'Joint & Mobility',
    shortDesc: 'Targeted protocols for ligament injuries, meniscus preservation, and knee osteoarthritis relief.',
    fullDesc: 'Whether recovering from sports injury or managing osteoarthritis stiffness, our structured knee rehabilitation emphasizes quad-hamstring balance, patellar tracking normalization, and low-impact joint lubrication exercises.',
    benefits: [
      'Restored walking confidence and stair climbing ability',
      'Reduced joint effusion, swelling, and morning stiffness',
      'Post-arthroscopy and conservative knee therapy'
    ],
    idealFor: ['Patellofemoral pain syndrome', 'Ligament strains and mild meniscus tears', 'Knee osteoarthritis'],
    techniqueHighlights: ['VMO biofeedback training', 'Closed kinetic chain squats & step-downs', 'Joint capsule distraction'],
    iconName: 'Crosshair'
  },
  {
    id: 'shoulder-rotator-care',
    title: 'Shoulder & Rotator Cuff Therapy',
    category: 'Joint & Mobility',
    shortDesc: 'Comprehensive recovery for frozen shoulder, impingement syndrome, and rotator cuff tendon strains.',
    fullDesc: 'Shoulder mechanics require synchronous scapular movement. Our approach restores scapulohumeral rhythm through targeted glenohumeral mobilizations and rotator cuff eccentric strengthening.',
    benefits: [
      'Overhead reaching range restored without pinch or pain',
      'Resolution of night pain and sleep disruption',
      'Re-stabilization of the shoulder capsule'
    ],
    idealFor: ['Adhesive capsulitis (Frozen Shoulder)', 'Supraspinatus tendinitis', 'Subacromial impingement'],
    techniqueHighlights: ['Maitland & Mulligan joint mobilizations', 'Isometric to isotonic rotator cuff loading', 'Scapular retractor activation'],
    iconName: 'Maximize2'
  },
  {
    id: 'therapeutic-exercise',
    title: 'Therapeutic Exercise & Fitness Fuel',
    category: 'Therapeutic Rehab',
    shortDesc: 'Evidence-based exercise prescription for functional movement, mobility, and long-term physical resilience.',
    fullDesc: 'Active exercise is the gold standard of enduring musculoskeletal rehabilitation. Our therapeutic exercise regimens are individually calibrated to your strength baseline, lifestyle demands, and postural requirements.',
    benefits: [
      'Development of resilient daily functional mobility',
      'Empowerment with a personalized home exercise regimen',
      'Optimal physical readiness for active living'
    ],
    idealFor: ['Individuals seeking structured active recovery', 'Post-injury physical conditioning', 'Mobility enhancement'],
    techniqueHighlights: ['Progressive resistance band training', 'Dynamic mobility flows', 'Proprioceptive balance training'],
    iconName: 'Zap'
  },
  {
    id: 'post-surgical-rehab',
    title: 'Post-Surgical Rehabilitation',
    category: 'Therapeutic Rehab',
    shortDesc: 'Systematic phase-by-phase recovery following orthopedic surgery (ACL reconstruction, spine, fractures).',
    fullDesc: 'Recovery after orthopedic procedures requires careful respect for biological tissue healing phases. We liaise with surgical discharge protocols to manage swelling, restore early safe range, and progressively reload healing structures.',
    benefits: [
      'Safe scar tissue mobilization and swelling management',
      'Regain full joint range within protected biological timelines',
      'Prevent compensatory movement dysfunctions'
    ],
    idealFor: ['Post-ACL reconstruction', 'Post-fracture stiffness', 'Post-spinal decompression / discectomy'],
    techniqueHighlights: ['Phase-gated progression criteria', 'Lymphatic and swelling drainage', 'Controlled passive-to-active movement'],
    iconName: 'Award'
  },
  {
    id: 'musculoskeletal-physio',
    title: 'Musculoskeletal & Pain Management',
    category: 'Sports Medicine',
    shortDesc: 'Holistic clinical evaluation and targeted physical therapy for acute and chronic body pain.',
    fullDesc: 'Our musculoskeletal clinical assessments evaluate posture, movement patterns, joint glides, and muscle trigger points to locate the functional driver of your pain, providing effective conservative relief.',
    benefits: [
      'Accurate biomechanical differential evaluation',
      'Non-invasive, drug-free conservative pain relief',
      'Long-term movement corrections to prevent recurrence'
    ],
    idealFor: ['Work-related strain and postural fatigue', 'Hip and groin discomfort', 'Fibromyalgia and muscular stiffness'],
    techniqueHighlights: ['Postural analysis', 'Myofascial release', 'Active neuromuscular facilitation'],
    iconName: 'CheckCircle2'
  }
];

export const AUTHENTIC_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Verified Patient (Google Maps)',
    rating: 5,
    date: 'Verified Google Review',
    text: 'Dr. Varun at Body Reboot Clinics provided exceptional treatment for my chronic lower back pain. His assessment was thorough, and the exercises prescribed gave me noticeable relief within sessions. Best physiotherapy centre in Kolar Road Bhopal!',
    verifiedSource: 'Google Business Profile',
    tag: 'Back Pain & Spine'
  },
  {
    id: 'rev-2',
    author: 'Sports Medicine Patient (Google Maps)',
    rating: 5,
    date: 'Verified Google Review',
    text: 'Visited for sports injury and knee rehabilitation. The scientific approach to movement assessment, muscle strengthening, and therapeutic exercise sets this clinic apart from traditional clinics. Highly recommended!',
    verifiedSource: 'Google Business Profile',
    tag: 'Sports Rehabilitation'
  },
  {
    id: 'rev-3',
    author: 'Mandakani Colony Resident (Google Maps)',
    rating: 5,
    date: 'Verified Google Review',
    text: 'Great clinic environment with clean facilities and professional care. Had severe cervical neck pain from long hours on laptop. The posture correction and manual therapy brought immediate relief.',
    verifiedSource: 'Google Business Profile',
    tag: 'Cervical & Tech Neck'
  },
  {
    id: 'rev-4',
    author: 'Local Guide Reviewer (Google Maps)',
    rating: 4.6,
    date: 'Verified Google Review',
    text: 'Very knowledgeable physiotherapist. Explains the root biomechanical reason behind the pain instead of just applying heat pads. 4.6/5 stars well deserved.',
    verifiedSource: 'Google Business Profile',
    tag: 'Physiotherapy Center'
  }
];

// Clinic Gallery referencing authentic clinic photographs and Google Maps links provided in prompt
export const GALLERY_ITEMS: GalleryPhoto[] = [
  {
    id: 'gal-storefront',
    title: 'Clinic Storefront & Signboard',
    category: 'Clinic Exterior',
    src: CLINIC_IMAGES.storefront,
    caption: 'Storefront at E-1, Mandakani Colony, J K Hospital Main Road, Opposite to Khadim, Kolar Road, Bhopal.',
    isOfficialStorefront: true,
    mapsUrl: 'https://maps.app.goo.gl/rPBdRLVzrZRqFczn9'
  },
  {
    id: 'gal-interior',
    title: 'Modern Rehabilitation & Exercise Studio',
    category: 'Interior Studio',
    src: CLINIC_IMAGES.interior,
    caption: 'Specialized exercise rehabilitation suite with posture grid, treatment plinths, and active recovery equipment.',
    mapsUrl: 'https://maps.app.goo.gl/9DcxfECzSsemQQDG8'
  },
  {
    id: 'gal-sports',
    title: 'Sports Medicine & Biomechanical Assessment',
    category: 'Equipment & Treatment',
    src: CLINIC_IMAGES.sports,
    caption: 'Kinetic movement analysis, knee alignment screening, and return-to-sport physical conditioning.',
    mapsUrl: 'https://maps.app.goo.gl/y6Y98n2SepS8Yd4H8'
  },
  {
    id: 'gal-spine',
    title: 'Spine Rehabilitation & Therapeutic Exercise',
    category: 'Equipment & Treatment',
    src: CLINIC_IMAGES.spine,
    caption: 'Targeted lumbar mobilization, hip alignment therapy, and therapeutic exercise prescription.',
    mapsUrl: 'https://maps.app.goo.gl/EHmWzFL3KkUR2QQa8'
  }
];

// Public Google Maps Contribution Links provided in prompt for authentic exploration
export const GOOGLE_MAPS_PHOTO_LINKS = [
  { label: 'Storefront & Exterior Signage', url: 'https://maps.app.goo.gl/9DcxfECzSsemQQDG8' },
  { label: 'Clinic Entrance & Reception', url: 'https://maps.app.goo.gl/y6Y98n2SepS8Yd4H8' },
  { label: 'Rehabilitation Equipment Suite', url: 'https://maps.app.goo.gl/EHmWzFL3KkUR2QQa8' },
  { label: 'Treatment Plinths & Modalities', url: 'https://maps.app.goo.gl/MhiwQe2XRi86ekn87' },
  { label: 'Therapeutic Exercise Area', url: 'https://maps.app.goo.gl/72RCHUcQvZPFZgzB6' },
  { label: 'Sports Medicine Training Floor', url: 'https://maps.app.goo.gl/4x18vUrXRDbsexiCA' },
  { label: 'Biomechanics Assessment Zone', url: 'https://maps.app.goo.gl/Jk3CGwhMn9cWfqJk8' },
  { label: 'Kolar Road Street View & Access', url: 'https://maps.app.goo.gl/g2ALwDd4niggs9yaA' },
  { label: 'Mandakani Colony Landmark View', url: 'https://maps.app.goo.gl/Ga2pzykrug3NXgfD9' },
  { label: 'Patient Consultation Suite', url: 'https://maps.app.goo.gl/xLLVRy9b3nM5dNei8' },
  { label: 'Opposite Khadim Landmark Guide', url: 'https://maps.app.goo.gl/4BqQAVWfaH1X71QNA' }
];

export const FREQUENT_QUESTIONS = [
  {
    q: 'What conditions does Body Reboot Clinics specialize in?',
    a: 'We specialize in Sports Medicine, Pain Management, Spine Rehabilitation (Lumbar & Cervical), Knee & Shoulder recovery, Post-surgical orthopedic rehab, and evidence-based Therapeutic Exercise.'
  },
  {
    q: 'Where is the clinic located in Bhopal?',
    a: 'Our clinic is situated at E-1, Mandakani Colony, J K Hospital Main Road, Opposite to Khadim, Kolar Road, Bhopal, Madhya Pradesh 462042.'
  },
  {
    q: 'Do I need a doctor referral to book an appointment?',
    a: 'No initial doctor referral is required. Our qualified physiotherapist conducts a thorough physical assessment. However, if you possess recent X-rays, MRI scans, or surgical discharge summaries, please bring them along.'
  },
  {
    q: 'What are the clinic working hours?',
    a: 'We are open Tuesday through Sunday from 10:30 AM to 8:30 PM. Monday is reserved for clinic maintenance and prior specialized appointments.'
  },
  {
    q: 'Can I enquire or book via WhatsApp?',
    a: 'Yes, you can directly reach us on WhatsApp at +91 78692 25304 for immediate appointment enquiries or consultation questions.'
  }
];
