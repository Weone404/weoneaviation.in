// Email templates for lead nurturing sequence

export const emailTemplates = {
  // 1. Welcome Email (sent immediately on lead capture)
  welcome: (name) => ({
    subject: '🎉 Welcome to WeOne Aviation | Your Path to Becoming a Pilot Starts Here',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0066CC 0%, #001a4d 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .cta-button { display: inline-block; background: #FF8C00; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 15px 0; }
            .footer { background: #333; color: white; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
            .section { margin: 20px 0; }
            .section h2 { color: #0066CC; font-size: 18px; margin-bottom: 10px; }
            .benefit { margin: 10px 0; padding-left: 20px; }
            .benefit:before { content: "✓ "; color: #FF8C00; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to WeOne Aviation! ✈️</h1>
              <p>Your journey to becoming a pilot starts now</p>
            </div>
            
            <div class="content">
              <p>Hi ${name},</p>
              
              <p>Thank you for downloading our guide and joining the WeOne Aviation community! We're thrilled to have you on this exciting journey to become a professional pilot.</p>
              
              <div class="section">
                <h2>📚 What to Expect Next</h2>
                <p>Over the next 7 days, you'll receive a personalized email sequence covering:</p>
                <div class="benefit">Complete CPL training roadmap</div>
                <div class="benefit">Honest cost breakdown & payment options</div>
                <div class="benefit">Study tips from successful pilots</div>
                <div class="benefit">Admission timeline & document checklist</div>
                <div class="benefit">Real pilot success stories</div>
              </div>

              <div class="section">
                <h2>🚀 Your Next Steps</h2>
                <p><strong>1. Download Your Guide</strong> – Check your email attachments for your free PDF</p>
                <p><strong>2. Review the Content</strong> – Take 15 minutes to understand your training path</p>
                <p><strong>3. Schedule a Call</strong> – Get personalized guidance from our experts</p>
              </div>

              <div class="section">
                <a href="https://weoneaviation.in/contact" class="cta-button">📞 Book Free Counselling</a>
              </div>

              <div class="section">
                <h2>💡 Quick Facts</h2>
                <div class="benefit">CPL training takes 18-24 months</div>
                <div class="benefit">Investment: ₹40-55 Lakhs (with payment plans available)</div>
                <div class="benefit">Starting salary: ₹50K-1L per month as trainee pilot</div>
                <div class="benefit">Lifetime earning potential: ₹5-10+ Crores</div>
              </div>

              <div class="section">
                <p>Have questions? Reply to this email or use our live chat on the website.</p>
                <p><strong>Best regards,<br>The WeOne Aviation Team</strong></p>
              </div>
            </div>

            <div class="footer">
              <p>info.weoneaviation@gmail.com | +91-XXXXX-XXXXX | weoneaviation.in</p>
              <p>© 2026 WeOne Aviation. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  // 2. Day 2 Follow-up (DGCA exam prep guide)
  dayTwoFollowUp: (name) => ({
    subject: '📖 Your Complete DGCA Exam Preparation Guide (Day 2)',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #FF8C00 0%, #cc6600 100%); color: white; padding: 25px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .cta-button { display: inline-block; background: #0066CC; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 15px 0; }
            .footer { background: #333; color: white; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
            .section { margin: 20px 0; }
            .section h2 { color: #FF8C00; font-size: 18px; margin-bottom: 10px; }
            .tip { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>DGCA Exam Mastery Plan 📚</h1>
              <p>Strategic preparation to ace your ground exams</p>
            </div>
            
            <div class="content">
              <p>Hi ${name},</p>
              
              <p>Yesterday you downloaded our DGCA Exam Checklist. Today, we're sharing the <strong>complete preparation strategy</strong> used by successful WeOne Aviation pilots.</p>
              
              <div class="section">
                <h2>🎯 The 9 DGCA Exam Papers (Your Focus Areas)</h2>
                <p>To get your Commercial Pilot License, you need to pass:</p>
                <ol>
                  <li><strong>Air Law & Procedures</strong> – 40 questions (2 hours)</li>
                  <li><strong>Air Navigation</strong> – 40 questions (2.5 hours)</li>
                  <li><strong>Aviation Meteorology</strong> – 40 questions (2 hours)</li>
                  <li><strong>Aerodynamics & Principles of Flight</strong> – 40 questions (2 hours)</li>
                  <li><strong>Aircraft Systems & Equipment</strong> – 40 questions (2 hours)</li>
                  <li><strong>Instrumentation & Navigation Aids</strong> – 40 questions (2 hours)</li>
                  <li><strong>General Knowledge & Human Performance</strong> – 40 questions (2 hours)</li>
                  <li><strong>Aircraft General Knowledge</strong> – 40 questions (2 hours)</li>
                  <li><strong>Technical General Knowledge</strong> – 40 questions (2 hours)</li>
                </ol>
              </div>

              <div class="section">
                <h2>⏰ Recommended Study Timeline</h2>
                <div class="tip">
                  <strong>Months 1-3:</strong> 2 hours/day – Cover all subjects once<br>
                  <strong>Months 4-5:</strong> 3 hours/day – Deep dive into weak areas<br>
                  <strong>Months 6-7:</strong> 4 hours/day – Practice tests & revision<br>
                  <strong>Month 8:</strong> Mock exams – Full-length simulations
                </div>
              </div>

              <div class="section">
                <h2>🔥 Success Tips from Top Pilots</h2>
                <div class="tip">✓ Use spaced repetition – Review notes every 3 days</div>
                <div class="tip">✓ Practice with real DGCA exam papers – Not textbooks alone</div>
                <div class="tip">✓ Join study groups – 2-3 motivated friends keep you accountable</div>
                <div class="tip">✓ Aim for 75%+ – Most pilots score 80-90% when they study smart</div>
              </div>

              <div class="section">
                <a href="https://weoneaviation.in/lead-magnets/dgca-exam-checklist" class="cta-button">📥 Download Full DGCA Checklist</a>
              </div>

              <div class="section">
                <p><strong>Tomorrow's email:</strong> Cost breakdown & payment plan options that work for every budget.</p>
              </div>
            </div>

            <div class="footer">
              <p>info.weoneaviation@gmail.com | weoneaviation.in</p>
              <p>Not interested? <a href="#" style="color: #ccc;">Unsubscribe</a></p>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  // 3. Day 3 Follow-up (Cost breakdown)
  dayThreeFollowUp: (name) => ({
    subject: '💰 Cost Breakdown: Everything Included (No Hidden Fees!) | Day 3',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%); color: white; padding: 25px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .cta-button { display: inline-block; background: #0066CC; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 15px 0; }
            .footer { background: #333; color: white; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
            .section { margin: 20px 0; }
            .section h2 { color: #28a745; font-size: 18px; margin-bottom: 10px; }
            .cost-box { background: white; padding: 15px; border: 2px solid #28a745; margin: 10px 0; border-radius: 5px; }
            .cost-box strong { color: #28a745; font-size: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💰 CPL Training Cost Breakdown</h1>
              <p>Complete transparency – No hidden fees!</p>
            </div>
            
            <div class="content">
              <p>Hi ${name},</p>
              
              <p>You're probably wondering: <strong>"How much will pilot training actually cost?"</strong></p>
              <p>Here's the honest answer with complete transparency:</p>
              
              <div class="section">
                <h2>📊 Total Investment: ₹40-55 Lakhs</h2>
                <div class="cost-box">
                  <strong>✓ Medical & Documentation:</strong> ₹13-25K
                </div>
                <div class="cost-box">
                  <strong>✓ Ground School (9 subjects):</strong> ₹1.9-2.8L
                </div>
                <div class="cost-box">
                  <strong>✓ Flight Training (200+ hours):</strong> ₹32.5-43.5L
                </div>
                <div class="cost-box">
                  <strong>✓ Simulator Training (50+ hours):</strong> ₹2.5-3.5L
                </div>
                <div class="cost-box">
                  <strong>✗ Accommodation/Living:</strong> ₹7-11L (not included)
                </div>
              </div>

              <div class="section">
                <h2>💳 Payment Plans That Work</h2>
                <p><strong>Option 1: Full Payment</strong><br>Pay upfront → Save 5-10% (₹2-5 Lakhs discount!)</p>
                <p><strong>Option 2: Semester-Based (4 payments)</strong><br>₹10-15L every 6 months</p>
                <p><strong>Option 3: Education Loan</strong><br>Borrow up to ₹50L @ 11-14% interest</p>
                <p><strong>Option 4: Monthly Installment Plan</strong><br>₹1.7-2.3L per month over 24 months</p>
              </div>

              <div class="section">
                <h2>📈 ROI: Money You'll Make Back</h2>
                <p><strong>Average First Officer Salary:</strong> ₹2-4 Lakhs/month</p>
                <p><strong>Break-even Time:</strong> 24 months (2 years)</p>
                <p><strong>5-Year Earnings:</strong> ₹1-2 Crores+</p>
                <p><strong>Lifetime Potential:</strong> ₹5-10+ Crores</p>
              </div>

              <div class="section">
                <a href="https://weoneaviation.in/cost-transparency" class="cta-button">📊 View Full Cost Details</a>
              </div>

              <div class="section">
                <p>Next email (Day 4): Real success stories from pilots who completed WeOne Aviation training.</p>
              </div>
            </div>

            <div class="footer">
              <p>info.weoneaviation@gmail.com | weoneaviation.in</p>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  // 4. Day 5 Follow-up (Success stories)
  dayFiveFollowUp: (name) => ({
    subject: '✈️ Book Your Free Pilot Counselling Call (Day 5)',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0066CC 0%, #001a4d 100%); color: white; padding: 25px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .cta-button { display: inline-block; background: #FF8C00; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 15px 0; }
            .footer { background: #333; color: white; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
            .section { margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✈️ WeOne Aviation Academy</h1>
            </div>
            
            <div class="content">
              <p>Hi ${name},</p>
              
              <div class="section">
                <a href="https://weoneaviation.in/contact" class="cta-button">📞 Talk to Our Advisors</a>
              </div>

              <div class="section">
                <p><strong>Next Step:</strong> Schedule a free 30-minute counselling call to discuss your specific situation and timeline.</p>
              </div>
            </div>

            <div class="footer">
              <p>info.weoneaviation@gmail.com | weoneaviation.in</p>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  // 5. Day 7 Follow-up (Final CTA)
  daySevenFollowUp: (name) => ({
    subject: '🎯 Last Chance: Book Your Free Pilot Counselling Session',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #FF8C00 0%, #cc6600 100%); color: white; padding: 25px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
            .cta-button { display: inline-block; background: #0066CC; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 15px 0; font-size: 16px; }
            .footer { background: #333; color: white; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
            .section { margin: 20px 0; }
            .benefit { margin: 10px 0; }
            .benefit:before { content: "✓ "; color: #FF8C00; font-weight: bold; font-size: 18px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 Your Free Counselling</h1>
              <p>Last email in this series – but your journey is just beginning!</p>
            </div>
            
            <div class="content">
              <p>Hi ${name},</p>
              
              <p>Over the last 7 days, you've learned:</p>
              <div class="benefit">The complete DGCA exam roadmap</div>
              <div class="benefit">Honest cost breakdown with payment options</div>
              <div class="benefit">Success stories from real pilots</div>
              <div class="benefit">Your potential earning power</div>
              
              <p><strong>Now it's time to take action.</strong></p>
              
              <div class="section">
                <h2>📞 Book Your FREE 30-Min Counselling</h2>
                <p>Our expert advisors will discuss:</p>
                <div class="benefit">Your aviation goals & background</div>
                <div class="benefit">Best training path for YOU</div>
                <div class="benefit">Custom timeline & cost estimate</div>
                <div class="benefit">Admission requirements & next steps</div>
                <div class="benefit">Payment plans that fit your budget</div>
              </div>

              <div class="section">
                <h2>⏰ Book a Slot Now (LIMITED AVAILABILITY)</h2>
                <a href="https://weoneaviation.in/contact" class="cta-button">📅 Schedule Your Call</a>
              </div>

              <div class="section">
                <h2>❓ Frequently Asked Questions</h2>
                <p><strong>Q: I have no flying experience. Can I still apply?</strong><br>
                A: Yes! No prior experience needed. We start from basics.</p>
                
                <p><strong>Q: What if I fail a DGCA exam?</strong><br>
                A: We provide free re-training until you pass.</p>
                
                <p><strong>Q: How soon can I start?</strong><br>
                A: Most batches start every month. You could begin next month!</p>
              </div>

              <div class="section">
                <p><strong>Still unsure?</strong> Reply to this email with your questions. Our team will respond within 24 hours.</p>
                <p><strong>Ready to commit?</strong> Click the button above and let's make your pilot dreams real.</p>
              </div>

              <div class="section">
                <p><strong>Best regards,</strong><br>
                The WeOne Aviation Team<br>
                info.weoneaviation@gmail.com</p>
              </div>
            </div>

            <div class="footer">
              <p>© 2026 WeOne Aviation. All rights reserved.</p>
              <p>You're receiving this email because you downloaded one of our guides.</p>
            </div>
          </div>
        </body>
      </html>
    `
  })
};

// Email scheduling sequence
export const emailSequence = [
  { day: 0, templateName: 'welcome', label: 'Immediate Welcome' },
  { day: 2, templateName: 'dayTwoFollowUp', label: 'Day 2: DGCA Exam Prep' },
  { day: 3, templateName: 'dayThreeFollowUp', label: 'Day 3: Cost Breakdown' },
  { day: 5, templateName: 'dayFiveFollowUp', label: 'Day 5: Success Stories' },
  { day: 7, templateName: 'daySevenFollowUp', label: 'Day 7: Counselling CTA' },
];
