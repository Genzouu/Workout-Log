import React from 'react';

import './Settings.css';

export default function Settings() {
    return (
        <div className="settings">
            <div className="unit">
                <p className="setting-label">Weight Unit:</p>
                <select>
                    <option>kg</option>
                    <option>lb</option>
                </select>
            </div>

            <div className="language">
                <p className="setting-label">Language:</p>
                <select>
                    <option>English</option>
                    <option>日本語</option>
                    <option>简体中文</option>
                </select>
            </div>
        </div>
    );
}