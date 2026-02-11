import React from 'react';

interface IconProps {
  name: string;
  type?: 'round' | 'outlined';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | string;
}

export const Icon: React.FC<IconProps> = ({ name, type = 'round', className = '', size = 'md' }) => {
  const iconClass = type === 'outlined' ? 'material-icons-outlined' : 'material-icons-round';
  
  let fontSize = '24px';
  if (size === 'sm') fontSize = '16px';
  if (size === 'md') fontSize = '24px';
  if (size === 'lg') fontSize = '32px';
  if (size === 'xl') fontSize = '48px';
  if (size === '2xl') fontSize = '64px';
  if (size === '3xl') fontSize = '80px';
  // Allow arbitrary sizes if passed
  if (!['sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(size)) {
    fontSize = size;
  }

  return (
    <span 
      className={`${iconClass} ${className} select-none`} 
      style={{ fontSize }}
    >
      {name}
    </span>
  );
};