
import React from 'react';
import { UserProfile } from '../types';

interface FullProfileModalContentProps {
  userProfile: UserProfile;
  T: any; // Translation object
}

function formatObjectForDisplay(obj: any): React.ReactNode {
  if (typeof obj !== 'object' || obj === null) return String(obj);
  // Render as key-value pairs
  return (
    <ul className="list-disc list-inside text-sm text-text-secondary">
      {Object.entries(obj).map(([key, val]) => (
        <li key={key}>
          <span className="font-semibold">{key}:</span> {typeof val === 'object' && val !== null ? JSON.stringify(val, null, 2) : String(val)}
        </li>
      ))}
    </ul>
  );
}

const ProfileDetailItem: React.FC<{ label: string; value?: string | number | string[] | React.ReactNode | object, isList?: boolean }> = ({ label, value, isList }) => {
  if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
    return null;
  }

  let displayValue: React.ReactNode;
  if (isList && Array.isArray(value)) {
    displayValue = (
      <ul className="list-disc list-inside text-text-secondary"> 
        {value.map((item, index) => (
          <li key={index}>{String(item)}</li>
        ))}
      </ul>
    );
  } else if (Array.isArray(value)) {
    displayValue = value.join(', ');
  } else if (typeof value === 'object' && !React.isValidElement(value)) {
    displayValue = formatObjectForDisplay(value);
  } else {
    displayValue = value;
  }

  return (
    <div className="bg-[#f8f5fc] p-3 sm:p-4 rounded-lg shadow-sm border border-border-color"> 
      <h4 className="text-sm font-semibold text-text-primary mb-0.5">{label}</h4>
      <div className="text-sm text-text-secondary">
        {displayValue}
      </div>
    </div>
  );
};

const FullProfileModalContent: React.FC<FullProfileModalContentProps> = ({ userProfile, T }) => {
  const user = userProfile;
  const labels = T.fullProfileContent || {};

  return (
    <div className="bg-[#f4f0ff] w-full h-full min-h-screen p-0 m-0">
      <div className="space-y-4">
        <ProfileDetailItem label={labels.fullName || "Full Name"} value={user.name} />
        {user.alias && <ProfileDetailItem label={labels.alias || "Alias"} value={user.alias} />}
        {user.age !== undefined && <ProfileDetailItem label={labels.age || "Age"} value={user.age} />}
        {user.gender && <ProfileDetailItem label={labels.gender || "Gender"} value={user.gender} />}
        {user.dateOfBirth && <ProfileDetailItem label={labels.dateOfBirth || "Date of Birth"} value={user.dateOfBirth} />}
        <ProfileDetailItem label={labels.email || "Email Address"} value={user.email} />
        {user.phone && <ProfileDetailItem label={labels.phone || "Phone Number"} value={user.phone} />}
        <ProfileDetailItem label={labels.countryOfOrigin || "Country of Origin"} value={user.countryOfOrigin} />
        <ProfileDetailItem label={labels.dateOfRegistration || "Date of Registration"} value={user.dateOfRegistration} />
        {user.challenges && user.challenges.length > 0 && (
          <ProfileDetailItem label={labels.keyChallenges || "Key Challenges"} value={user.challenges} isList />
        )}
        {user.bio && (
          <ProfileDetailItem 
            label={labels.bio || "Biography"} 
            value={<span className="whitespace-pre-wrap">{user.bio}</span>} 
          />
        )}
        {user.onboardingSummary && (
          <ProfileDetailItem 
            label={labels.onboardingSummary || "Onboarding Summary"} 
            value={<span className="whitespace-pre-wrap">{user.onboardingSummary}</span>} 
          />
        )}
      </div>
    </div>
  );
};

export default FullProfileModalContent;