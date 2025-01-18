import React, { useState, useEffect, useMemo } from 'react';
import { FaUpload, FaSpinner, FaDownload, FaTrash } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function PatientDashboard() {
  const [state, setState] = useState({
    images: {
      face: { preview: null, file: null },
      nails: { preview: null, file: null }
    },
    analysis: {
      face: null,
      nails: null,
      loading: false,
      error: null
    }
  });

  const canAnalyze = useMemo(() => {
    return state.images.face.file && state.images.nails.file && !state.analysis.loading;
  }, [state.images.face.file, state.images.nails.file, state.analysis.loading]);

  useEffect(() => {
    return () => {
      if (state.images.face.preview) URL.revokeObjectURL(state.images.face.preview);
      if (state.images.nails.preview) URL.revokeObjectURL(state.images.nails.preview);
    };
  }, [state.images]);

  // Updated file validation function
  const validateFile = (file) => {
    if (!file) throw new Error('No file selected');
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      throw new Error('Invalid file type. Please upload a JPEG, PNG, or WebP image.');
    }
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File too large. Maximum size is 5MB.');
    }
    return true;
  };

  // Updated image upload handler
  const handleImageUpload = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setState(prev => ({
        ...prev,
        analysis: {
          ...prev.analysis,
          error: 'Please upload only image files.'
        }
      }));
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setState(prev => ({
        ...prev,
        analysis: {
          ...prev.analysis,
          error: 'Image size should be less than 5MB.'
        }
      }));
      return;
    }

    // Create URL for preview
    const imageUrl = URL.createObjectURL(file);

    setState(prev => ({
      ...prev,
      images: {
        ...prev.images,
        [type]: {
          file: file,
          url: imageUrl
        }
      },
      analysis: {
        ...prev.analysis,
        error: null,
        [type]: null // Clear previous analysis when new image is uploaded
      }
    }));
  };

  const handleRemoveImage = (type) => {
    // Revoke the object URL to avoid memory leaks
    if (state.images[type].url) {
      URL.revokeObjectURL(state.images[type].url);
    }

    setState(prev => ({
      ...prev,
      images: {
        ...prev.images,
        [type]: {
          file: null,
          url: null
        }
      },
      analysis: {
        ...prev.analysis,
        [type]: null // Clear analysis when image is removed
      }
    }));
  };

  // Updated base64 conversion function
  const fileToGenerativePart = async (file) => {
    try {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          // Get the base64 string without the prefix
          const base64String = reader.result.split(',')[1];
          resolve({
            inlineData: {
              data: base64String,
              mimeType: file.type
            }
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Error converting file to base64:', error);
      throw new Error('Failed to process image');
    }
  };

  // Updated analyze function
  const analyzeImages = async () => {
    try {
      setState(prev => ({
        ...prev,
        analysis: { ...prev.analysis, loading: true, error: null }
      }));

      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      let results = { face: null, nails: null };

      // Process face image with Ayurvedic analysis
      if (state.images.face.file) {
        try {
          const facePart = await fileToGenerativePart(state.images.face.file);
          const facePrompt = `Analyze this face image and provide a detailed Ayurvedic assessment with the following structure:

# Facial Analysis Report (Mukha Pariksha)

## 1. Prakriti Assessment (Constitutional Analysis)
- Dominant dosha indicators visible on face
- Secondary dosha influences
- Overall constitutional assessment

## 2. Current Dosha Status
### Vata Indicators:
- Skin dryness level
- Presence of fine lines
- Dark circles assessment
- Complexion evenness

### Pitta Indicators:
- Skin inflammation signs
- Pigmentation patterns
- Sensitivity indicators
- Heat manifestations

### Kapha Indicators:
- Skin oiliness
- Facial puffiness
- Complexion pallor
- Tissue firmness

## 3. Dhatu (Tissue) Analysis
- Rasa (Plasma): Hydration status
- Rakta (Blood): Circulation assessment
- Mamsa (Muscle): Facial tone evaluation
- Meda (Fat): Distribution patterns

## 4. Additional Observations
- Agni (Digestive Fire) indicators
- Ama (Toxin) accumulation signs
- Overall vitality assessment

## 5. Ayurvedic Recommendations
### Dietary Adjustments:
- Recommended foods
- Foods to avoid
- Dietary habits

### Lifestyle Modifications:
- Daily routines (Dinacharya)
- Exercise recommendations
- Sleep guidelines

### Therapeutic Measures:
- Herbs and supplements
- External treatments
- Facial therapies

Please provide detailed observations and specific recommendations for each section.`;
          
          const faceResult = await model.generateContent([
            facePrompt,
            facePart
          ]);
          results.face = faceResult.response.text();
        } catch (error) {
          console.error('Face analysis error:', error);
        }
      }

      // Process nails image with Ayurvedic analysis
      if (state.images.nails.file) {
        try {
          const nailsPart = await fileToGenerativePart(state.images.nails.file);
          const nailsPrompt = `Analyze these nails and provide a detailed Ayurvedic assessment with the following structure:

# Nail Analysis Report (Nakha Pariksha)

## 1. Dosha Manifestation Analysis
### Vata Characteristics:
- Texture assessment
- Brittleness evaluation
- Growth patterns
- Irregularities

### Pitta Characteristics:
- Color analysis
- Inflammation signs
- Heat indicators
- Sensitivity assessment

### Kapha Characteristics:
- Thickness evaluation
- Surface smoothness
- Overall formation
- Strength indicators

## 2. Dhatu (Tissue) Health Markers
- Rasa (Plasma): Nail bed hydration
- Rakta (Blood): Circulation signs
- Mamsa (Muscle): Strength indicators
- Asthi (Bone): Matrix health
- Majja (Marrow): Growth patterns

## 3. Metabolic Assessment
- Agni (Digestive Fire) indicators
- Nutrient absorption signs
- Metabolism markers

## 4. Imbalance Indicators
- Current health concerns
- Potential underlying issues
- System weaknesses

## 5. Treatment Protocol
### Internal Treatments:
- Recommended herbs
- Dietary supplements
- Nutritional adjustments

### External Treatments:
- Oil applications
- Therapeutic soaks
- Topical remedies

### Lifestyle Recommendations:
- Daily care routine
- Preventive measures
- Dietary modifications

Please provide specific observations and detailed recommendations for each section.`;
          
          const nailsResult = await model.generateContent([
            nailsPrompt,
            nailsPart
          ]);
          results.nails = nailsResult.response.text();
        } catch (error) {
          console.error('Nails analysis error:', error);
        }
      }

      setState(prev => ({
        ...prev,
        analysis: {
          ...prev.analysis,
          loading: false,
          face: results.face,
          nails: results.nails
        }
      }));
    } catch (error) {
      console.error('Analysis error:', error);
      setState(prev => ({
        ...prev,
        analysis: {
          ...prev.analysis,
          loading: false,
          error: `Analysis failed: ${error.message || 'Please try again.'}`
        }
      }));
    }
  };

  // Updated UI Components
  const ImageUploadSection = ({ type, title }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        {state.images[type].preview ? (
          <div className="relative">
            <img
              src={state.images[type].preview}
              alt={`${type} preview`}
              className="max-w-full h-auto rounded-lg mx-auto"
            />
            <button
              onClick={() => {
                if (state.images[type].preview) {
                  URL.revokeObjectURL(state.images[type].preview);
                }
                setState(prev => ({
                  ...prev,
                  images: {
                    ...prev.images,
                    [type]: { preview: null, file: null }
                  }
                }));
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            >
              <FaTrash />
            </button>
          </div>
        ) : (
          <label className="space-y-4 relative block cursor-pointer">
            <FaUpload className="mx-auto text-4xl text-gray-400" />
            <p className="text-gray-500">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-400">Accepted formats: JPEG, PNG, WebP (Max: 5MB)</p>
            <input
              type="file"
              accept={ACCEPTED_IMAGE_TYPES.join(',')}
              onChange={(e) => handleImageUpload(e, type)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Ayurvedic Health Analysis Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your facial and nail images for a comprehensive Ayurvedic assessment of your health and wellness
          </p>
        </div>

        {/* Image Upload Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {Object.entries(state.images).map(([key, value]) => (
            <div key={key} className="bg-white rounded-2xl shadow-lg p-6 transition-transform hover:scale-[1.02]">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 capitalize">
                {key} Analysis
              </h2>
              <div className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                {value.url ? (
                  <div className="space-y-4">
                    <img
                      src={value.url}
                      alt={`Uploaded ${key}`}
                      className="max-h-64 mx-auto rounded-lg shadow-md"
                    />
                    <button
                      onClick={() => handleRemoveImage(key)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => document.getElementById(`${key}-input`).click()}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="p-4 bg-blue-50 rounded-full">
                        <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Click to upload {key} image</p>
                      <p className="text-sm text-gray-400">JPG, PNG up to 5MB</p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  id={`${key}-input`}
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, key)}
                  className="hidden"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Analysis Button */}
        <div className="text-center mb-12">
          <button
            onClick={analyzeImages}
            disabled={!canAnalyze}
            className={`px-8 py-3 rounded-xl text-lg font-semibold transition-all
              ${canAnalyze 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl' 
                : 'bg-gray-300 cursor-not-allowed text-gray-500'}`}
          >
            {state.analysis.loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Analyzing...</span>
              </div>
            ) : (
              'Begin Ayurvedic Analysis'
            )}
          </button>
        </div>

        {/* Results Section */}
        {(state.analysis.face || state.analysis.nails) && (
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(state.analysis).map(([key, value]) => {
              if (key === 'loading' || key === 'error') return null;
              if (!value) return null;
              
              return (
                <div key={key} className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 capitalize">
                    {key} Analysis Results
                  </h3>
                  <div className="prose prose-lg max-w-none">
                    {value.split('\n').map((line, index) => {
                      if (line.startsWith('#')) {
                        return <h2 key={index} className="text-xl font-bold text-gray-800 mt-6">{line.replace(/^#+ /, '')}</h2>;
                      } else if (line.startsWith('##')) {
                        return <h3 key={index} className="text-lg font-semibold text-gray-700 mt-4">{line.replace(/^##+ /, '')}</h3>;
                      } else if (line.startsWith('-')) {
                        return <li key={index} className="text-gray-600 ml-4">{line.replace(/^- /, '')}</li>;
                      } else {
                        return <p key={index} className="text-gray-600">{line}</p>;
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Error Message */}
        {state.analysis.error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {state.analysis.error}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientDashboard;