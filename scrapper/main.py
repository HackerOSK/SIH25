import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext, simpledialog
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from bs4 import BeautifulSoup
import time
import logging
import base64
import io
from PIL import Image, ImageEnhance, ImageFilter
import cv2
import numpy as np
import threading
import json
from webdriver_manager.chrome import ChromeDriverManager
import google.generativeai as genai
import requests

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger("NgoDarpanScraper")

class NgoDarpanScraperGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("NGO Darpan Scraper with Gemini AI")
        self.root.geometry("900x700")
        
        self.driver = None
        self.scraping_thread = None
        self.gemini_api_key = None
        self.gemini_model = None
        
        self.setup_gui()
        
    def setup_gui(self):
        # Main frame
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # API Key section
        api_frame = ttk.LabelFrame(main_frame, text="Gemini API Configuration", padding="10")
        api_frame.grid(row=0, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=(0, 10))
        
        ttk.Label(api_frame, text="Gemini API Key:").grid(row=0, column=0, sticky=tk.W, pady=2)
        self.api_key_entry = ttk.Entry(api_frame, width=60, show="*")
        self.api_key_entry.grid(row=0, column=1, sticky=(tk.W, tk.E), padx=(5, 0), pady=2)
        
        self.test_api_button = ttk.Button(api_frame, text="Test API", command=self.test_gemini_api)
        self.test_api_button.grid(row=0, column=2, padx=(5, 0))
        
        self.api_status_var = tk.StringVar(value="API not configured")
        api_status_label = ttk.Label(api_frame, textvariable=self.api_status_var, foreground="red")
        api_status_label.grid(row=1, column=0, columnspan=3, sticky=tk.W, pady=2)
        
        # Input section
        input_frame = ttk.LabelFrame(main_frame, text="Search Parameters", padding="10")
        input_frame.grid(row=1, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=(0, 10))
        
        ttk.Label(input_frame, text="NPO Name:").grid(row=0, column=0, sticky=tk.W, pady=2)
        self.npo_name_entry = ttk.Entry(input_frame, width=50)
        self.npo_name_entry.grid(row=0, column=1, sticky=(tk.W, tk.E), padx=(5, 0), pady=2)
        
        ttk.Label(input_frame, text="OR DARPAN ID:").grid(row=1, column=0, sticky=tk.W, pady=2)
        self.darpan_id_entry = ttk.Entry(input_frame, width=50)
        self.darpan_id_entry.grid(row=1, column=1, sticky=(tk.W, tk.E), padx=(5, 0), pady=2)
        
        # Control buttons
        button_frame = ttk.Frame(main_frame)
        button_frame.grid(row=2, column=0, columnspan=2, pady=10)
        
        self.start_button = ttk.Button(button_frame, text="Start Search", command=self.start_search)
        self.start_button.pack(side=tk.LEFT, padx=5)
        
        self.stop_button = ttk.Button(button_frame, text="Stop", command=self.stop_search, state=tk.DISABLED)
        self.stop_button.pack(side=tk.LEFT, padx=5)
        
        self.manual_captcha_button = ttk.Button(button_frame, text="Manual Captcha", 
                                              command=self.manual_captcha_solve, state=tk.DISABLED)
        self.manual_captcha_button.pack(side=tk.LEFT, padx=5)
        
        # Status
        self.status_var = tk.StringVar(value="Ready")
        status_label = ttk.Label(main_frame, textvariable=self.status_var)
        status_label.grid(row=3, column=0, columnspan=2, sticky=tk.W, pady=5)
        
        # Results area
        results_frame = ttk.LabelFrame(main_frame, text="Results", padding="10")
        results_frame.grid(row=4, column=0, columnspan=2, sticky=(tk.W, tk.E, tk.N, tk.S), pady=(10, 0))
        
        self.results_text = scrolledtext.ScrolledText(results_frame, wrap=tk.WORD, width=80, height=20)
        self.results_text.pack(fill=tk.BOTH, expand=True)
        
        # Configure grid weights
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)
        main_frame.columnconfigure(0, weight=1)
        main_frame.rowconfigure(4, weight=1)
        api_frame.columnconfigure(1, weight=1)
        input_frame.columnconfigure(1, weight=1)
    def test_gemini_api(self):
        """Test Gemini API connection"""
        try:
            api_key = self.api_key_entry.get().strip()
            if not api_key:
                messagebox.showerror("Error", "Please enter your Gemini API key")
                return
            
            # Configure Gemini
            genai.configure(api_key=api_key)
            
            # Test with a simple request
            model = genai.GenerativeModel('gemini-1.5-flash')
            response = model.generate_content("Hello, can you see this message?")
            
            if response.text:
                self.gemini_api_key = api_key
                self.gemini_model = model
                self.api_status_var.set("✓ API Connected Successfully")
                self.api_status_var.config = {"foreground": "green"}
                self.log_message("Gemini API connected successfully")
                messagebox.showinfo("Success", "Gemini API connected successfully!")
            else:
                raise Exception("No response from Gemini")
                
        except Exception as e:
            self.api_status_var.set("✗ API Connection Failed")
            error_msg = f"Gemini API test failed: {str(e)}"
            self.log_message(error_msg)
            messagebox.showerror("API Error", error_msg)
            
    def log_message(self, message):
        """Add message to results area with timestamp"""
        timestamp = time.strftime("%H:%M:%S")
        self.results_text.insert(tk.END, f"[{timestamp}] {message}\n")
        self.results_text.see(tk.END)
        self.root.update_idletasks()
        """Add message to results area with timestamp"""
        timestamp = time.strftime("%H:%M:%S")
        self.results_text.insert(tk.END, f"[{timestamp}] {message}\n")
        self.results_text.see(tk.END)
        self.root.update_idletasks()
        
    def create_driver(self):
        """Create Chrome WebDriver with optimized options"""
        try:
            options = webdriver.ChromeOptions()
            
            # Suppress common Chrome errors and warnings
            options.add_argument("--disable-logging")
            options.add_argument("--log-level=3")
            options.add_argument("--disable-gpu-logging")
            options.add_argument("--disable-dev-shm-usage")
            options.add_argument("--no-sandbox")
            
            # Anti-detection measures
            options.add_argument("--disable-blink-features=AutomationControlled")
            options.add_experimental_option("excludeSwitches", ["enable-automation"])
            options.add_experimental_option('useAutomationExtension', False)
            
            # Disable unnecessary features
            options.add_argument("--disable-extensions")
            options.add_argument("--disable-plugins")
            options.add_argument("--disable-images")  # Faster loading
            options.add_argument("--disable-background-networking")
            options.add_argument("--disable-background-timer-throttling")
            options.add_argument("--disable-renderer-backgrounding")
            options.add_argument("--disable-backgrounding-occluded-windows")
            
            # Set user agent to avoid detection
            options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
            
            # Use webdriver manager to handle chromedriver
            service = Service(ChromeDriverManager().install())
            driver = webdriver.Chrome(service=service, options=options)
            
            # Execute script to remove webdriver property
            driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            
            # Set timeouts
            driver.set_page_load_timeout(45)
            driver.implicitly_wait(5)
            
            return driver
        except Exception as e:
            logger.error(f"Failed to create driver: {e}")
            raise
            
    def enhance_captcha_image(self, image):
        """Enhanced image preprocessing for better OCR"""
        try:
            # Convert PIL to OpenCV format
            img_array = np.array(image)
            
            # Convert to grayscale
            if len(img_array.shape) > 2:
                gray = cv2.cvtColor(img_array, cv2.COLOR_RGB2GRAY)
            else:
                gray = img_array
                
            # Apply multiple preprocessing techniques
            
            # 1. Gaussian blur to reduce noise
            blurred = cv2.GaussianBlur(gray, (3, 3), 0)
            
            # 2. Threshold to get binary image
            _, thresh = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
            
            # 3. Morphological operations to clean up
            kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))
            cleaned = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
            
            # 4. Resize for better recognition
            height, width = cleaned.shape
            if height < 50:
                scale_factor = 50 / height
                new_width = int(width * scale_factor)
                new_height = int(height * scale_factor)
                cleaned = cv2.resize(cleaned, (new_width, new_height), interpolation=cv2.INTER_CUBIC)
            
            # Convert back to PIL
            return Image.fromarray(cleaned)
            
        except Exception as e:
            logger.error(f"Image enhancement failed: {e}")
            return image
            
    def solve_captcha_gemini(self):
        """Solve captcha using Gemini Vision API"""
        try:
            if not self.gemini_model:
                self.log_message("Gemini API not configured")
                return None
                
            self.log_message("Attempting to locate captcha...")
            
            # Multiple selectors for captcha canvas/image
            captcha_selectors = [
                "canvas",
                "canvas.captcha-canvas",
                "canvas[id*='captcha']",
                "img[id*='captcha']",
                "img[src*='captcha']",
                "#captcha img",
                ".captcha img",
                ".captcha canvas"
            ]
            
            captcha_element = None
            for selector in captcha_selectors:
                try:
                    elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    if elements:
                        captcha_element = elements[0]
                        self.log_message(f"Found captcha element with selector: {selector}")
                        break
                except Exception:
                    continue
            
            if not captcha_element:
                self.log_message("No captcha element found with any selector")
                return None
            
            # Try to get image data
            image_data = None
            
            # Method 1: Canvas toDataURL
            if captcha_element.tag_name.lower() == 'canvas':
                try:
                    captcha_base64 = self.driver.execute_script(
                        "return arguments[0].toDataURL('image/png').substring(22);", 
                        captcha_element
                    )
                    if captcha_base64:
                        image_data = base64.b64decode(captcha_base64)
                        self.log_message("Extracted image from canvas using toDataURL")
                except Exception as e:
                    self.log_message(f"Canvas extraction failed: {e}")
            
            # Method 2: Screenshot of element
            if not image_data:
                try:
                    captcha_screenshot = captcha_element.screenshot_as_png
                    if captcha_screenshot:
                        image_data = captcha_screenshot
                        self.log_message("Extracted image using element screenshot")
                except Exception as e:
                    self.log_message(f"Screenshot extraction failed: {e}")
            
            # Method 3: Full page screenshot and crop
            if not image_data:
                try:
                    # Get element location and size
                    location = captcha_element.location
                    size = captcha_element.size
                    
                    # Take full page screenshot
                    full_screenshot = self.driver.get_screenshot_as_png()
                    full_image = Image.open(io.BytesIO(full_screenshot))
                    
                    # Crop to captcha area
                    left = location['x']
                    top = location['y']
                    right = left + size['width']
                    bottom = top + size['height']
                    
                    captcha_image = full_image.crop((left, top, right, bottom))
                    
                    # Convert to bytes
                    img_buffer = io.BytesIO()
                    captcha_image.save(img_buffer, format='PNG')
                    image_data = img_buffer.getvalue()
                    
                    self.log_message("Extracted image using page screenshot and crop")
                except Exception as e:
                    self.log_message(f"Crop extraction failed: {e}")
            
            if not image_data:
                self.log_message("Failed to extract captcha image with any method")
                return None
            
            # Convert to PIL Image for processing
            original_image = Image.open(io.BytesIO(image_data))
            self.log_message(f"Image size: {original_image.size}")
            
            # Enhance image for better recognition
            enhanced_image = self.enhance_captcha_image(original_image)
            
            # Save debug image
            try:
                enhanced_image.save("debug_captcha_gemini.png")
                self.log_message("Saved debug captcha image as debug_captcha_gemini.png")
            except:
                pass
            
            # Convert enhanced image to bytes for Gemini
            img_buffer = io.BytesIO()
            enhanced_image.save(img_buffer, format='PNG')
            enhanced_image_data = img_buffer.getvalue()
            
            # Send to Gemini for recognition
            self.log_message("Sending captcha to Gemini AI for recognition...")
            
            # Create image part for Gemini
            image_part = {
                "mime_type": "image/png",
                "data": enhanced_image_data
            }
            
            # Craft prompt for captcha recognition
            prompt = """
            You are looking at a CAPTCHA image. Please read the text shown in the image and return ONLY the text characters you see, nothing else. 

            The text might contain:
            - Letters (both uppercase and lowercase)
            - Numbers
            - Usually 4-8 characters total

            Important instructions:
            - Return ONLY the characters you see in the CAPTCHA
            - Do not include any explanations or additional text
            - Do not include spaces unless they are clearly part of the CAPTCHA
            - If you're unsure about a character, make your best guess
            - Remove any background noise or lines from your reading

            What text do you see in this CAPTCHA image?
            """
            
            # Try multiple times with different approaches
            attempts = [
                prompt,
                "Read the text in this CAPTCHA image. Return only the text characters, no explanations:",
                "What letters and numbers do you see in this security code image? Reply with just the characters:",
                "Extract the text from this verification image. Output format: just the text characters"
            ]
            
            for i, attempt_prompt in enumerate(attempts):
                try:
                    self.log_message(f"Gemini attempt {i+1}/4...")
                    
                    response = self.gemini_model.generate_content([attempt_prompt, image_part])
                    
                    if response.text:
                        # Clean the response
                        captcha_text = response.text.strip()
                        
                        # Remove common non-alphanumeric characters
                        captcha_text = ''.join(c for c in captcha_text if c.isalnum())
                        
                        if 4 <= len(captcha_text) <= 8:
                            self.log_message(f"Gemini recognized captcha: {captcha_text}")
                            return captcha_text
                        else:
                            self.log_message(f"Gemini result '{captcha_text}' invalid length ({len(captcha_text)})")
                    else:
                        self.log_message(f"Gemini attempt {i+1} returned empty response")
                        
                except Exception as e:
                    self.log_message(f"Gemini attempt {i+1} failed: {e}")
                    continue
            
            self.log_message("All Gemini attempts failed")
            return None
            
        except Exception as e:
            self.log_message(f"Gemini captcha solving failed: {e}")
            logger.exception("Detailed Gemini captcha error")
            return None
        """Enhanced captcha solving with multiple detection methods"""
        try:
            self.log_message("Attempting to locate captcha...")
            
            # Multiple selectors for captcha canvas/image
            captcha_selectors = [
                "canvas",
                "canvas.captcha-canvas",
                "canvas[id*='captcha']",
                "img[id*='captcha']",
                "img[src*='captcha']",
                "#captcha img",
                ".captcha img",
                ".captcha canvas"
            ]
            
            captcha_element = None
            for selector in captcha_selectors:
                try:
                    elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    if elements:
                        captcha_element = elements[0]
                        self.log_message(f"Found captcha element with selector: {selector}")
                        break
                except Exception:
                    continue
            
            if not captcha_element:
                self.log_message("No captcha element found with any selector")
                return None
            
            # Try to get image data
            image_data = None
            
            # Method 1: Canvas toDataURL
            if captcha_element.tag_name.lower() == 'canvas':
                try:
                    captcha_base64 = self.driver.execute_script(
                        "return arguments[0].toDataURL('image/png').substring(22);", 
                        captcha_element
                    )
                    if captcha_base64:
                        image_data = base64.b64decode(captcha_base64)
                        self.log_message("Extracted image from canvas using toDataURL")
                except Exception as e:
                    self.log_message(f"Canvas extraction failed: {e}")
            
            # Method 2: Screenshot of element
            if not image_data:
                try:
                    captcha_screenshot = captcha_element.screenshot_as_png
                    if captcha_screenshot:
                        image_data = captcha_screenshot
                        self.log_message("Extracted image using element screenshot")
                except Exception as e:
                    self.log_message(f"Screenshot extraction failed: {e}")
            
            # Method 3: Full page screenshot and crop
            if not image_data:
                try:
                    # Get element location and size
                    location = captcha_element.location
                    size = captcha_element.size
                    
                    # Take full page screenshot
                    full_screenshot = self.driver.get_screenshot_as_png()
                    full_image = Image.open(io.BytesIO(full_screenshot))
                    
                    # Crop to captcha area
                    left = location['x']
                    top = location['y']
                    right = left + size['width']
                    bottom = top + size['height']
                    
                    captcha_image = full_image.crop((left, top, right, bottom))
                    
                    # Convert to bytes
                    img_buffer = io.BytesIO()
                    captcha_image.save(img_buffer, format='PNG')
                    image_data = img_buffer.getvalue()
                    
                    self.log_message("Extracted image using page screenshot and crop")
                except Exception as e:
                    self.log_message(f"Crop extraction failed: {e}")
            
            if not image_data:
                self.log_message("Failed to extract captcha image with any method")
                return None
            
            # Convert to PIL Image
            original_image = Image.open(io.BytesIO(image_data))
            self.log_message(f"Image size: {original_image.size}")
            
            # Save debug image (optional)
            try:
                original_image.save("debug_captcha.png")
                self.log_message("Saved debug captcha image as debug_captcha.png")
            except:
                pass
            
            # Try multiple OCR configurations
            ocr_configs = [
                "--psm 8 -c tessedit_char_whitelist=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
                "--psm 7 -c tessedit_char_whitelist=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
                "--psm 6 -c tessedit_char_whitelist=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
                "--psm 13 -c tessedit_char_whitelist=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
                "--psm 8",
                "--psm 7",
                "--psm 6"
            ]
            
            results = []
            
            # Enhanced image
            enhanced_image = self.enhance_captcha_image(original_image)
            
            # Try different preprocessing and OCR configs
            for i, config in enumerate(ocr_configs):
                try:
                    # OCR on enhanced image
                    text = pytesseract.image_to_string(enhanced_image, config=config).strip()
                    clean_text = ''.join(c for c in text if c.isalnum())
                    if clean_text and 4 <= len(clean_text) <= 8:
                        results.append(clean_text)
                        self.log_message(f"OCR config {i+1} result: {clean_text}")
                        
                    # OCR on original image
                    text_orig = pytesseract.image_to_string(original_image, config=config).strip()
                    clean_orig = ''.join(c for c in text_orig if c.isalnum())
                    if clean_orig and 4 <= len(clean_orig) <= 8:
                        results.append(clean_orig)
                        self.log_message(f"OCR config {i+1} original result: {clean_orig}")
                        
                except Exception as e:
                    self.log_message(f"OCR attempt {i+1} failed: {e}")
                    continue
            
            if results:
                # Return most common result or first valid one
                best_result = max(set(results), key=results.count)
                self.log_message(f"Best OCR result: {best_result}")
                return best_result
            
            self.log_message("No valid OCR results found")
            return None
            
        except Exception as e:
            self.log_message(f"Captcha OCR failed: {e}")
            logger.exception("Detailed captcha error")
            return None
            
    def manual_captcha_solve(self):
        """Allow manual captcha input"""
        try:
            captcha_text = simpledialog.askstring("Manual Captcha", 
                                                 "Enter the captcha text visible in the browser window:",
                                                 parent=self.root)
            if captcha_text:
                # Find captcha input field
                captcha_input_selectors = [
                    "input[formcontrolname='captcha']",
                    "input[name='captcha']",
                    "input[placeholder*='captcha']",
                    "input[id*='captcha']"
                ]
                
                captcha_input = None
                for selector in captcha_input_selectors:
                    try:
                        captcha_input = self.driver.find_element(By.CSS_SELECTOR, selector)
                        break
                    except:
                        continue
                
                if captcha_input:
                    captcha_input.clear()
                    captcha_input.send_keys(captcha_text)
                    self.log_message(f"Manual captcha entered: {captcha_text}")
                    
                    # Try to click search button
                    try:
                        search_button = self.driver.find_element(By.XPATH, "//button[contains(text(),'Search') or contains(text(),'SEARCH')]")
                        if not search_button.get_attribute("disabled"):
                            search_button.click()
                            self.log_message("Search submitted with manual captcha")
                    except Exception as e:
                        self.log_message(f"Could not auto-submit after manual captcha: {e}")
                else:
                    self.log_message("Could not find captcha input field")
                    
                return captcha_text
            else:
                self.log_message("Manual captcha entry cancelled")
        except Exception as e:
            self.log_message(f"Manual captcha solve failed: {e}")
            logger.error(f"Manual captcha solve failed: {e}")
        return None
        
    def fill_captcha_and_search(self):
        """Fill captcha and click search with retry mechanism"""
        max_attempts = 3
        attempt = 0
        
        while attempt < max_attempts:
            try:
                attempt += 1
                self.log_message(f"Captcha solving attempt {attempt}/{max_attempts}")
                
                # Wait for page to fully load
                time.sleep(3)
                
                # Look for captcha input field with multiple selectors
                captcha_input_selectors = [
                    "input[formcontrolname='captcha']",
                    "input[name='captcha']",
                    "input[placeholder*='captcha']",
                    "input[placeholder*='Captcha']",
                    "input[id*='captcha']",
                    "#captcha",
                    ".captcha input"
                ]
                
                captcha_input = None
                for selector in captcha_input_selectors:
                    try:
                        captcha_input = WebDriverWait(self.driver, 5).until(
                            EC.presence_of_element_located((By.CSS_SELECTOR, selector))
                        )
                        self.log_message(f"Found captcha input with selector: {selector}")
                        break
                    except TimeoutException:
                        continue
                
                if not captcha_input:
                    self.log_message("Captcha input field not found")
                    # Try to continue without captcha
                    time.sleep(2)
                else:
                    # Try Gemini first
                    captcha_text = self.solve_captcha_gemini()
                    
                    if captcha_text:
                        try:
                            captcha_input.clear()
                            captcha_input.send_keys(captcha_text)
                            self.log_message(f"Filled captcha with Gemini result: {captcha_text}")
                        except Exception as e:
                            self.log_message(f"Failed to fill captcha input: {e}")
                    else:
                        # Enable manual captcha button
                        self.manual_captcha_button.config(state=tk.NORMAL)
                        self.log_message("Gemini AI failed. Please use 'Manual Captcha' button or check browser window.")
                        
                        # Wait for user to potentially solve manually
                        for i in range(30):  # Wait up to 30 seconds
                            try:
                                current_value = captcha_input.get_attribute("value")
                                if current_value and len(current_value) >= 4:
                                    self.log_message(f"Manual captcha detected: {current_value}")
                                    break
                            except:
                                pass
                            time.sleep(1)
                        else:
                            self.log_message("No manual captcha input detected")
                
                # Updated search button selectors to match the specific button structure
                search_button_selectors = [
                    # Target the specific button with primeng classes
                    "button.p-button.primary-btn.filled-btn",
                    "button[data-pc-name='button'][type='button']",
                    "button.p-ripple.p-element.p-button.p-component.primary-btn.filled-btn",
                    
                    # More specific selectors for the button text
                    "//button[.//span[contains(text(),'Search')]]",
                    "//button[contains(@class,'primary-btn') and .//span[text()='Search']]",
                    "//button[contains(@class,'p-button') and .//span[contains(text(),'Search')]]",
                    
                    # Fallback selectors
                    "//button[contains(text(),'Search')]",
                    "//button[contains(text(),'SEARCH')]",
                    "//input[@type='submit' and contains(@value,'Search')]",
                    "//button[contains(@class,'search')]",
                    "//button[@type='submit']",
                    "//button[contains(.,'खोज')]"  # Hindi for search
                ]
                
                search_button = None
                used_selector = ""
                
                # Try CSS selectors first
                css_selectors = [
                    "button.p-button.primary-btn.filled-btn",
                    "button[data-pc-name='button'][type='button']",
                    "button.p-ripple.p-element.p-button.p-component.primary-btn.filled-btn"
                ]
                
                for selector in css_selectors:
                    try:
                        buttons = self.driver.find_elements(By.CSS_SELECTOR, selector)
                        for btn in buttons:
                            # Check if this button contains "Search" text
                            button_text = btn.get_attribute("textContent") or btn.text
                            if "Search" in button_text:
                                search_button = btn
                                used_selector = f"CSS: {selector}"
                                self.log_message(f"Found search button with CSS selector: {selector}")
                                break
                        if search_button:
                            break
                    except Exception as e:
                        self.log_message(f"CSS selector {selector} failed: {e}")
                        continue
                
                # If CSS selectors failed, try XPath selectors
                if not search_button:
                    xpath_selectors = [
                        "//button[.//span[contains(text(),'Search')]]",
                        "//button[contains(@class,'primary-btn') and .//span[text()='Search']]",
                        "//button[contains(@class,'p-button') and .//span[contains(text(),'Search')]]",
                        "//button[contains(text(),'Search')]",
                        "//button[contains(text(),'SEARCH')]",
                        "//button[@type='submit']"
                    ]
                    
                    for selector in xpath_selectors:
                        try:
                            search_button = WebDriverWait(self.driver, 5).until(
                                EC.presence_of_element_located((By.XPATH, selector))
                            )
                            used_selector = f"XPath: {selector}"
                            self.log_message(f"Found search button with XPath selector: {selector}")
                            break
                        except TimeoutException:
                            continue
                
                if not search_button:
                    self.log_message("Search button not found with any selector")
                    # Log all buttons for debugging
                    try:
                        all_buttons = self.driver.find_elements(By.TAG_NAME, "button")
                        self.log_message(f"Found {len(all_buttons)} buttons on page:")
                        for i, btn in enumerate(all_buttons[:10]):  # Log first 10 buttons
                            try:
                                btn_text = btn.get_attribute("textContent") or btn.text or "No text"
                                btn_classes = btn.get_attribute("class") or "No classes"
                                self.log_message(f"  Button {i+1}: '{btn_text}' | Classes: {btn_classes}")
                            except:
                                pass
                    except Exception as e:
                        self.log_message(f"Failed to log buttons: {e}")
                    return False
                
                # Wait for button to be enabled and click
                max_wait = 30  # Increased wait time
                wait_count = 0
                
                self.log_message(f"Found search button using: {used_selector}")
                
                while wait_count < max_wait:
                    try:
                        # Check if button is enabled
                        is_disabled = search_button.get_attribute("disabled")
                        aria_disabled = search_button.get_attribute("aria-disabled")
                        
                        # Also check for CSS classes that might indicate disabled state
                        button_classes = search_button.get_attribute("class") or ""
                        has_disabled_class = any(cls in button_classes.lower() for cls in ['disabled', 'p-disabled'])
                        
                        if not is_disabled and aria_disabled != "true" and not has_disabled_class:
                            # Scroll button into view
                            self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", search_button)
                            time.sleep(1)
                            
                            # Try multiple click methods
                            click_successful = False
                            
                            # Method 1: Regular click
                            try:
                                search_button.click()
                                click_successful = True
                                self.log_message("Search button clicked successfully (regular click)")
                            except Exception as e:
                                self.log_message(f"Regular click failed: {e}")
                            
                            # Method 2: JavaScript click
                            if not click_successful:
                                try:
                                    self.driver.execute_script("arguments[0].click();", search_button)
                                    click_successful = True
                                    self.log_message("Search button clicked successfully (JavaScript click)")
                                except Exception as e:
                                    self.log_message(f"JavaScript click failed: {e}")
                            
                            # Method 3: Action chains click
                            if not click_successful:
                                try:
                                    from selenium.webdriver.common.action_chains import ActionChains
                                    action = ActionChains(self.driver)
                                    action.move_to_element(search_button).click().perform()
                                    click_successful = True
                                    self.log_message("Search button clicked successfully (ActionChains click)")
                                except Exception as e:
                                    self.log_message(f"ActionChains click failed: {e}")
                            
                            if click_successful:
                                break
                        else:
                            disabled_reason = []
                            if is_disabled:
                                disabled_reason.append("disabled attribute")
                            if aria_disabled == "true":
                                disabled_reason.append("aria-disabled=true")
                            if has_disabled_class:
                                disabled_reason.append("disabled CSS class")
                            
                            reason_text = ", ".join(disabled_reason) if disabled_reason else "unknown reason"
                            self.log_message(f"Search button disabled ({reason_text}), waiting... ({wait_count+1}/{max_wait})")
                            time.sleep(1)
                            wait_count += 1
                            
                    except Exception as e:
                        self.log_message(f"Error checking button state: {e}")
                        time.sleep(1)
                        wait_count += 1
                
                if wait_count >= max_wait:
                    self.log_message("Timeout waiting for search button to be enabled")
                    return False
                
                # Wait to see if search was successful
                time.sleep(5)
                
                # Check for common error messages
                error_indicators = [
                    "//*[contains(text(), 'Invalid') or contains(text(), 'incorrect') or contains(text(), 'wrong')]",
                    "//*[contains(text(), 'गलत') or contains(text(), 'अवैध')]",  # Hindi error terms
                    "//div[contains(@class, 'error')]",
                    "//span[contains(@class, 'error')]",
                    "//*[contains(@class, 'p-message-error')]",  # PrimeNG error message
                    "//*[contains(@class, 'alert-danger')]"
                ]
                
                error_found = False
                for error_selector in error_indicators:
                    try:
                        error_elements = self.driver.find_elements(By.XPATH, error_selector)
                        for error_element in error_elements:
                            if error_element.is_displayed():
                                error_text = error_element.text
                                if error_text and len(error_text) > 0:
                                    self.log_message(f"Error detected: {error_text}")
                                    error_found = True
                                    break
                        if error_found:
                            break
                    except Exception:
                        continue
                
                if not error_found:
                    self.log_message("Search appears successful")
                    return True
                else:
                    self.log_message(f"Error detected, retrying attempt {attempt}")
                    # Refresh captcha before retry
                    try:
                        refresh_buttons = self.driver.find_elements(By.XPATH, "//button[contains(@class, 'refresh') or contains(@title, 'refresh')]")
                        if refresh_buttons:
                            refresh_buttons[0].click()
                            self.log_message("Refreshed captcha for retry")
                            time.sleep(2)
                    except:
                        pass
                    time.sleep(2)
                    
            except Exception as e:
                self.log_message(f"Error on attempt {attempt}: {str(e)}")
                logger.exception(f"Search attempt {attempt} error")
                if attempt == max_attempts:
                    self.manual_captcha_button.config(state=tk.NORMAL)
                    return False
                time.sleep(3)
        
        self.log_message("All captcha attempts failed")
        return False
    
    
    def parse_results(self, html):
        """Parse search results from HTML"""
        try:
            soup = BeautifulSoup(html, 'html.parser')
            results = []
            
            # Look for different result patterns
            
            # Pattern 1: Table rows
            table_rows = soup.find_all('tr')
            for tr in table_rows[1:]:  # Skip header
                cells = [td.get_text(strip=True) for td in tr.find_all(['td', 'th'])]
                if len(cells) > 1 and any(cell for cell in cells):
                    results.append({
                        'type': 'table_row',
                        'data': cells
                    })
            
            # Pattern 2: Card-like divs
            cards = soup.find_all('div', class_=lambda x: x and ('card' in x.lower() or 'result' in x.lower()))
            for card in cards:
                text = card.get_text(strip=True)
                if text and len(text) > 20:  # Filter out empty or very short content
                    results.append({
                        'type': 'card',
                        'data': text
                    })
            
            # Pattern 3: List items
            if not results:
                list_items = soup.find_all('li')
                for li in list_items:
                    text = li.get_text(strip=True)
                    if text and len(text) > 10:
                        results.append({
                            'type': 'list_item',
                            'data': text
                        })
            
            # Pattern 4: Look for specific NGO data fields
            ngo_names = soup.find_all(text=lambda x: x and ('ngo' in x.lower() or 'organization' in x.lower()))
            for name in ngo_names[:10]:  # Limit to prevent spam
                parent = name.parent
                if parent:
                    context = parent.get_text(strip=True)
                    if len(context) > 20:
                        results.append({
                            'type': 'ngo_mention',
                            'data': context
                        })
            
            return results
            
        except Exception as e:
            logger.error(f"Result parsing failed: {e}")
            return [{'type': 'error', 'data': f'Parsing failed: {str(e)}'}]
            
    def search_ngo(self, search_type, search_value):
        """Main search function"""
        try:
            self.log_message("Starting NGO Darpan search...")
            self.status_var.set("Initializing browser...")
            
            # Create driver
            self.driver = self.create_driver()
            
            # Navigate to search page
            self.status_var.set("Loading search page...")
            self.driver.get("https://ngodarpan.gov.in/#/search-ngo")
            
            # Wait for page to load
            time.sleep(5)
            
            self.log_message("Search page loaded")
            self.status_var.set("Filling search form...")
            
            # Fill search field based on type
            if search_type == "name":
                # Find NPO name input
                input_selectors = [
                    "input[formcontrolname='npoName']",
                    "input[placeholder*='NPO']",
                    "input[placeholder*='Name']"
                ]
                
                input_field = None
                for selector in input_selectors:
                    try:
                        input_field = WebDriverWait(self.driver, 10).until(
                            EC.presence_of_element_located((By.CSS_SELECTOR, selector))
                        )
                        break
                    except TimeoutException:
                        continue
                
                if not input_field:
                    raise Exception("NPO name input field not found")
                
                input_field.clear()
                input_field.send_keys(search_value)
                self.log_message(f"Entered NPO name: {search_value}")
                
            elif search_type == "darpan_id":
                # Find DARPAN ID input
                input_selectors = [
                    "input[formcontrolname='uniqueId']",
                    "input[placeholder*='DARPAN']",
                    "input[placeholder*='ID']"
                ]
                
                input_field = None
                for selector in input_selectors:
                    try:
                        input_field = WebDriverWait(self.driver, 10).until(
                            EC.presence_of_element_located((By.CSS_SELECTOR, selector))
                        )
                        break
                    except TimeoutException:
                        continue
                
                if not input_field:
                    raise Exception("DARPAN ID input field not found")
                
                input_field.clear()
                input_field.send_keys(search_value)
                self.log_message(f"Entered DARPAN ID: {search_value}")
            
            # Handle captcha and search
            self.status_var.set("Solving captcha...")
            if self.fill_captcha_and_search():
                self.status_var.set("Waiting for results...")
                self.log_message("Search submitted successfully, waiting for results...")
                
                # Wait for results to load
                time.sleep(5)
                
                # Try to detect results container
                try:
                    WebDriverWait(self.driver, 20).until(
                        EC.any_of(
                            EC.presence_of_element_located((By.XPATH, "//table//tr[position()>1]")),
                            EC.presence_of_element_located((By.XPATH, "//*[contains(@class,'result')]")),
                            EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'No records found')]"))
                        )
                    )
                except TimeoutException:
                    self.log_message("Timeout waiting for results, capturing current page...")
                
                # Parse results
                self.status_var.set("Parsing results...")
                html = self.driver.page_source
                results = self.parse_results(html)
                
                # Display results
                self.display_results(results)
                self.status_var.set("Search completed")
                
            else:
                self.log_message("Failed to solve captcha or submit search")
                self.status_var.set("Captcha solving failed")
                
        except Exception as e:
            error_msg = f"Search failed: {str(e)}"
            self.log_message(error_msg)
            self.status_var.set("Search failed")
            logger.exception("Search error")
            
    def display_results(self, results):
        """Display parsed results"""
        if not results:
            self.log_message("No results found")
            return
            
        self.log_message(f"\n{'='*50}")
        self.log_message(f"SEARCH RESULTS ({len(results)} items found)")
        self.log_message(f"{'='*50}")
        
        for i, result in enumerate(results, 1):
            self.log_message(f"\nResult {i}:")
            self.log_message(f"Type: {result.get('type', 'unknown')}")
            
            data = result.get('data', '')
            if isinstance(data, list):
                for j, item in enumerate(data):
                    self.log_message(f"  Field {j+1}: {item}")
            else:
                # Split long text for better readability
                if len(data) > 100:
                    lines = [data[i:i+100] for i in range(0, len(data), 100)]
                    for line in lines:
                        self.log_message(f"  {line}")
                else:
                    self.log_message(f"  {data}")
        
        self.log_message(f"\n{'='*50}")
        
    def start_search(self):
        """Start search in separate thread"""
        # Check if Gemini API is configured
        if not self.gemini_model:
            messagebox.showerror("Error", "Please configure and test Gemini API first")
            return
            
        npo_name = self.npo_name_entry.get().strip()
        darpan_id = self.darpan_id_entry.get().strip()
        
        if not npo_name and not darpan_id:
            messagebox.showerror("Error", "Please enter either NPO Name or DARPAN ID")
            return
            
        if npo_name and darpan_id:
            messagebox.showerror("Error", "Please enter only one search parameter")
            return
            
        # Disable start button, enable stop button
        self.start_button.config(state=tk.DISABLED)
        self.stop_button.config(state=tk.NORMAL)
        self.manual_captcha_button.config(state=tk.DISABLED)
        
        # Clear results
        self.results_text.delete(1.0, tk.END)
        
        # Start search in thread
        search_type = "name" if npo_name else "darpan_id"
        search_value = npo_name if npo_name else darpan_id
        
        self.scraping_thread = threading.Thread(
            target=self.search_ngo,
            args=(search_type, search_value),
            daemon=True
        )
        self.scraping_thread.start()
        
        # Monitor thread completion
        self.monitor_thread()
        
    def monitor_thread(self):
        """Monitor scraping thread completion"""
        if self.scraping_thread and self.scraping_thread.is_alive():
            self.root.after(1000, self.monitor_thread)
        else:
            # Thread completed
            self.start_button.config(state=tk.NORMAL)
            self.stop_button.config(state=tk.DISABLED)
            self.manual_captcha_button.config(state=tk.DISABLED)
            
    def stop_search(self):
        """Stop current search"""
        try:
            if self.driver:
                self.driver.quit()
                self.driver = None
            self.log_message("Search stopped by user")
            self.status_var.set("Stopped")
        except Exception as e:
            logger.error(f"Error stopping search: {e}")
            
    def __del__(self):
        """Cleanup"""
        try:
            if self.driver:
                self.driver.quit()
        except:
            pass

def main():
    # Check if required packages are available
    try:
        import cv2
        from webdriver_manager.chrome import ChromeDriverManager
        import google.generativeai as genai
    except ImportError as e:
        print(f"Missing required package: {e}")
        print("Please install required packages:")
        print("pip install selenium beautifulsoup4 pillow opencv-python webdriver-manager google-generativeai")
        return
    
    root = tk.Tk()
    app = NgoDarpanScraperGUI(root)
    
    # Add instructions dialog
    instructions = """
NGO Darpan Scraper with Gemini AI

Setup Instructions:
1. Get your Gemini API key from: https://makersuite.google.com/app/apikey
2. Enter your API key in the field above and click 'Test API'
3. Once connected, enter either NPO Name or DARPAN ID
4. Click 'Start Search' to begin

Features:
- Uses Google Gemini AI for accurate captcha solving
- Automatic browser handling
- Manual captcha fallback option
- Detailed logging of all operations

The app will open a browser window and automatically solve captchas using AI.
"""
    
    messagebox.showinfo("Welcome", instructions)
    
    # Handle window close
    def on_closing():
        if app.driver:
            app.driver.quit()
        root.destroy()
    
    root.protocol("WM_DELETE_WINDOW", on_closing)
    root.mainloop()

if __name__ == "__main__":
    main()