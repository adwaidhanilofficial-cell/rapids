import React from 'react';
import { Course } from '../types';
import { Icon } from './icon';

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    <div 
      onClick={() => onClick(course)}
      className="relative bg-surface-dark-2 rounded-2xl overflow-hidden shadow-xl group cursor-pointer border border-white/5 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${course.isLocked ? 'filter blur-[2px] scale-110' : ''}`}
        />
        
        {/* Overlays */}
        {course.isLocked ? (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center z-10">
            <Icon name="lock" type="outlined" className="text-gold-light/80 text-3xl mb-3 drop-shadow-md" />
            <h3 className="font-serif text-xl font-bold gold-text-clip tracking-[0.2em] drop-shadow-lg text-center leading-tight">
              COMING<br />SOON
            </h3>
          </div>
        ) : (
          <>
             {course.rating && (
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10 flex items-center gap-1">
                  <Icon name="star" className="text-primary text-[10px]" size="12px" />
                  <span className="text-[10px] font-bold text-white">{course.rating}</span>
                </div>
             )}
             {course.isPopular && (
                <div className="absolute bottom-3 left-3 bg-primary text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-lg">
                  POPULAR
                </div>
             )}
          </>
        )}
      </div>

      <div className="p-5 relative z-20 bg-surface-dark-2">
        <div className="flex justify-between items-start mb-2">
            <div>
                <h3 className={`font-serif text-lg text-white mb-1 transition-colors ${!course.isLocked && 'group-hover:text-primary'}`}>
                    {course.title}
                </h3>
                {course.category && (
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">{course.category}</p>
                )}
                {course.subtitle && !course.isLocked && (
                    <p className="text-xs text-gray-500 mb-4 line-clamp-1 mt-1">{course.subtitle}</p>
                )}
            </div>
            {course.isLocked && (
                 <Icon name="notifications_none" className="text-gray-600 hover:text-primary transition-colors" />
            )}
        </div>

        {!course.isLocked && (
          <div className="flex justify-between items-center mt-4">
            <div className="flex -space-x-2">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBd4sLU8zDslr074KWyt1T9M6TBgxB5_oeykOBrwKmgWo3EvYd0RuO7zVlWXgDlA4LMosaymY7Bli3_jSQGkTrv2W9haXr-NdvhNo1wNbOIxjeT1E-5JiinxEbo7lQsojgcRzBbhkIl2SmJ5Un222pweNH1kGC0BQaF2Wr1hoNCR--AI-xInpLvuFHBFNu2sNSorgyXsVFkOm4IzUejd-RyL4GT-CBl738nQeQDexXrG4iU4QanXBnYmHR_gbJtqHvEGp0bIIkHfs" alt="User" className="w-6 h-6 rounded-full border border-surface-dark-2 object-cover" />
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJkW2KNN-rlnHRjodUZothq5zz8U95i3wNGGDMa0CC7UJYy6Y4ZCOau4G__kNTVw96mJXTs4CenRxnyo_abnbN-uvpB2EAbviD2_ecU9kjSXVX5aBgN3PnYNrMJ94aLKLP5jcN4WZHohLaiNOn8M6o6_YLMLIg25NN1ndrV8cvvTe4ZtbN0q8etFbiRioVKAnL_BEz6fQ8Ym88_kuDjUVe65V4pUazf3NhLCPQ-SaHlH8il7mU2RPjMWBJp4t916m7yhniR7-FYrg" alt="User" className="w-6 h-6 rounded-full border border-surface-dark-2 object-cover" />
              <div className="w-6 h-6 rounded-full border border-surface-dark-2 bg-surface-dark flex items-center justify-center text-[8px] text-gray-400 font-medium">
                +{course.students ? (course.students > 1000 ? '2k' : course.students) : '2k'}
              </div>
            </div>
            <button className="text-primary text-xs font-bold tracking-wide border-b border-primary/30 pb-0.5 hover:border-primary transition-colors">
              DETAILS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};